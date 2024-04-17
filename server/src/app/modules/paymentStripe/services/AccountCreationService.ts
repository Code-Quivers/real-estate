/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";

import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import prisma from "../../../../shared/prisma";


const stripe = new Stripe(
  "sk_test_51P3kzDBMbxBFdGafgJOAyh9RAFzMyuqWwQgLV3c9lQRRM9mMNxeIwA8JRVyQSsvDblTKrLTTjFjZVhOyEwiFLKHm00OZivN3dg",
);

class StripeAccountManager {
  private static initialAcctInfo: any = {
    type: 'custom',
    business_type: 'individual',
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
  }
  static createConnectedAccount = async (accountInfo: any) => {
    const newAccount = await stripe.accounts.create(this.initialAcctInfo);

    if (!newAccount) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create connected account');
    }

    console.log('New account created:', newAccount.id);
    const userId: string = accountInfo?.userId || "";
    const finAcctData = {
      finOrgAccountId: newAccount.id,
      userId: userId
    }
    const newFinAcct = await prisma.financialAccount.create({
      data: finAcctData
    })

    if (!newFinAcct) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Financial Account!')
    }
    const resp = await this.createAccountLink(newAccount.id)
    return resp;
  };

  static createAccountLink = async (sConnectedAccountId: string) => {
    const accountLink = await stripe.accountLinks.create({
      account: sConnectedAccountId,
      refresh_url: 'http://localhost:3000/property-owner/settings',
      return_url: 'http://localhost:3000/property-owner/settings',
      type: 'account_onboarding',
      collection_options: {
        fields: 'eventually_due'
      }
    });

    console.log(accountLink, 'linked account information-----------------')
    if (!accountLink) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create linked for the account!")
    }
    return {
      jsonResponse: accountLink,
      httpStatusCode: 201,
    };
  };

  static updateFinancialAccountInfo = async (userId: string) => {
    const finAcctData = await prisma.financialAccount.findUnique({
      where: { userId },
      select: {
        finOrgAccountId: true
      }
    })

    if (!finAcctData) {
      console.log("Failed to fetch financial organization account id!")
      throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong!");
    }

    const stripeAcctData = await stripe.accounts.retrieve(finAcctData.finOrgAccountId)
    const toBeUpdate: any = {
      chargesEnabled: stripeAcctData.charges_enabled,
      payoutsEnable: stripeAcctData.payouts_enabled,
      detailsSubmitted: stripeAcctData.details_submitted,
      transfers: stripeAcctData?.capabilities?.transfers === 'active' ? true : false,
      email: stripeAcctData.email,
    }

    if (stripeAcctData.external_accounts?.data) {
      toBeUpdate['externalAccount'] = stripeAcctData.external_accounts?.data[0]
    }

    const updatedFinAcctData = await prisma.financialAccount.update({
      where: { userId },
      data: toBeUpdate
    })

    if (!updatedFinAcctData) {
      console.log("Failed to update the Financial Account Data!")
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update!')
    }
    return {
      jsonResponse: updatedFinAcctData,
      httpStatusCode: 200,
    }
  }

  static financialAccountStatus = async (userId: string) => {
    const finAcctData = await prisma.financialAccount.findUnique({
      where: { userId: userId },
      select: {
        payoutsEnable: true,
        detailsSubmitted: true
      }
    })
    if (!finAcctData) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to fetch status of account!")
    }
    const status: boolean = finAcctData.payoutsEnable && finAcctData.detailsSubmitted ? true : false;
    return {
      jsonResponse: { status },
      httpStatusCode: 200,
    };
  }
}

export default StripeAccountManager;