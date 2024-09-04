/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";

import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import prisma from "../../../../shared/prisma";
import { calculatePropertyOwnerProfileScore } from "../../propertyOwner/propertyOwner.utils";
import config from "../../../../config";
import { infoLogger } from "../../../../shared/logger";

const stripe = new Stripe(config.stripe_sk);

class StripeAccountManager {
  // For standard account with dashboard access
  // private static initialAcctInfo: any = {
  //   type: "standard",
  //   business_type: "individual",
  //   controller: {
  //     stripe_dashboard: {
  //       type: "full",
  //     },
  //   },
  // };

  // For custom account without dashboard access
  private static initialAcctInfo: any = {
    type: "custom",
    business_type: "individual",
    // email: 'jenny.rosen@example.com',
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
    // tos_acceptance: {
    //   service_agreement: 'recipient',
    // },
  };
  static createConnectedAccount = async (accountInfo: any) => {
    try {
      const newAccount = await stripe.accounts.create(this.initialAcctInfo);

      if (!newAccount) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create connected account");
      }

      infoLogger.info("New Stripe  account created:", newAccount?.id);
      const ownerId: string = accountInfo?.ownerId || "";
      const finAcctData = {
        finOrgAccountId: newAccount.id,
        ownerId: ownerId,
      };
      const newFinAcct = await prisma.financialAccount.create({
        data: finAcctData,
      });

      if (!newFinAcct) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Financial Account!");
      }
      const resp = await this.createAccountLink(newAccount.id);
      return resp;
    } catch (err) {
      console.log(err);
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Financial Account!");
    }
  };

  static createAccountLink = async (sConnectedAccountId: string) => {
    const accountLink = await stripe.accountLinks.create({
      account: sConnectedAccountId,
      refresh_url: `${config.client_url}/property-owner/settings`,
      return_url: `${config.client_url}/property-owner/settings`,
      type: "account_onboarding",
      collection_options: {
        fields: "eventually_due",
      },
    });

    console.log(accountLink, "linked account information-----------------");
    if (!accountLink) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create linked for the account!");
    }
    return {
      jsonResponse: accountLink,
      httpStatusCode: 201,
    };
  };

  static updateFinancialAccountInfo = async (finOrgAccountId: string) => {
    const stripeAcctData = await stripe.accounts.retrieve(finOrgAccountId);
    const toBeUpdate: any = {
      chargesEnabled: stripeAcctData.charges_enabled,
      payoutsEnable: stripeAcctData.payouts_enabled,
      detailsSubmitted: stripeAcctData.details_submitted,
      transfers: stripeAcctData?.capabilities?.transfers === "active" ? true : false,
      email: stripeAcctData.email,
    };

    if (stripeAcctData.external_accounts?.data) {
      toBeUpdate["externalAccount"] = stripeAcctData.external_accounts?.data[0];
    }

    const updatedFinAcctData = await prisma.financialAccount.update({
      where: { finOrgAccountId },
      data: toBeUpdate,
    });

    if (!updatedFinAcctData) {
      console.log("Failed to update the Financial Account Data!");
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update!");
    }

    if (updatedFinAcctData) {
      const prop = await prisma.propertyOwner.findUnique({
        where: {
          propertyOwnerId: updatedFinAcctData.ownerId,
        },
        include: {
          FinancialAccount: true,
          _count: true,
        },
      });

      const profileScore = calculatePropertyOwnerProfileScore(prop);
      await prisma.propertyOwner.update({
        where: {
          propertyOwnerId: updatedFinAcctData.ownerId,
        },
        data: {
          score: profileScore.profileScore,
          scoreRatio: profileScore.scoreRatio,
        },
      });
    }

    return updatedFinAcctData;
  };

  static isAccountNeedToUpdate = async (ownerId: string) => {
    try {
      const finAcctData = await prisma.financialAccount.findUnique({
        where: { ownerId },
        select: {
          finOrgAccountId: true,
          detailsSubmitted: true,
        },
      });
      if (finAcctData === null || finAcctData?.detailsSubmitted) return "";
      return finAcctData.finOrgAccountId;
    } catch (err) {
      console.log(err);
      console.log("Failed to fetch financial account information from db!");
      throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong!");
    }
  };

  static conditionalUpdateOfFinancilaAccountInfo = async (ownerId: string) => {
    const finOrgAccountId = await this.isAccountNeedToUpdate(ownerId);
    if (finOrgAccountId) {
      this.updateFinancialAccountInfo(finOrgAccountId);
    }
  };

  static financialAccountStatus = async (ownerId: string) => {
    const finAcctData = await prisma.financialAccount.findUnique({
      where: { ownerId: ownerId },
      select: {
        payoutsEnable: true,
        detailsSubmitted: true,
      },
    });
    if (!finAcctData) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch status of account!");
    }
    const status: boolean = finAcctData.payoutsEnable && finAcctData.detailsSubmitted ? true : false;
    return {
      jsonResponse: { status },
      httpStatusCode: 200,
    };
  };
}

export default StripeAccountManager;
