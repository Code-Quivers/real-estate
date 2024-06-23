/* eslint-disable no-unused-vars */
"use client";

import { useCreateAccountLinkMutation, useCreateConnectedAccountMutation } from "@/redux/features/payment/stripePaymentApi";
import { useGetFinancialInfoQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Notification, Placeholder, useToaster } from "rsuite";

const BankingCredentials = () => {
  const toaster = useToaster();
  const router = useRouter();
  const { data, isLoading, isError } = useGetFinancialInfoQuery();

  //! Create------
  const [
    createAccountLink,
    { data: linkedAccountData, isLoading: isLoadingCreateAccount, isSuccess: isSuccessCreate, isError: isErrorCreate, error: createErrorData },
  ] = useCreateAccountLinkMutation();
  //! connect----------
  const [
    createConnectedAccount,
    { data: connectedAccountData, isLoading: isLoadingConnectAccount, isSuccess: isSuccessConnect, isError: isErrorConnect, error: connectErrorData },
  ] = useCreateConnectedAccountMutation();

  // ! submit
  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const handleCreateAccountForStripe = async () => {
    setIsLoadingAccount(true);
    if (data?.data?.finOrgAccountId) {
      await createAccountLink({ sConnectedAccountId: data?.data?.finOrgAccountId });
    } else {
      await createConnectedAccount({});
    }
    // router.push(resp?.data?.data?.url);
  };
  // ! side effect
  const handleRedirect = (url) => {
    if (url) {
      router.push(url);
    }
  };

  useEffect(() => {
    // for creating
    if (isSuccessCreate && linkedAccountData?.data?.url) {
      handleRedirect(linkedAccountData.data.url);
    }
    // for connect
    if (isSuccessConnect && connectedAccountData?.data?.url) {
      handleRedirect(connectedAccountData.data.url);
    }
    // for loading false
    if (isSuccessCreate || isSuccessConnect) {
      setIsLoadingAccount(false);
    }

    // for create error
    if (!isSuccessCreate && !isLoadingCreateAccount && isErrorCreate) {
      toaster.push(
        <Notification type="error" header="Error" closable>
          <div>
            <p className="xl:text-lg xl:font-semibold mb-2">{createErrorData?.message ?? "Error! Something went wrong !"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      setIsLoadingAccount(false);
    }
    // for connect error
    if (!isSuccessConnect && !isLoadingConnectAccount && isErrorConnect) {
      toaster.push(
        <Notification type="error" header="Error" closable>
          <div>
            <p className="xl:text-lg xl:font-semibold mb-2">{connectErrorData?.message ?? "Error! Something went wrong !"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      setIsLoadingAccount(false);
    }
  }, [
    isLoadingConnectAccount,
    isSuccessConnect,
    isErrorConnect,
    connectedAccountData,
    createErrorData,
    //
    isLoadingCreateAccount,
    isSuccessCreate,
    isErrorCreate,
    linkedAccountData,
    handleRedirect,
    connectErrorData,
    toaster,
  ]);

  // !
  const maskAccountNumber = (accountNumber) => {
    // Extract last four digits
    const lastFourDigits = accountNumber.slice(-4);
    // Mask all characters except the last four
    const maskedDigits = "*".repeat(accountNumber.length - 4);
    // Combine masked characters with last four digits
    const formattedNumber = maskedDigits + lastFourDigits;
    // Insert space every four characters
    const spacedNumber = formattedNumber.replace(/(.{4})/g, "$1 ");
    return spacedNumber;
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-medium">Credentials of Getting Money</h4>
        <p className="font-medium max-lg:hidden">Card Information</p>
      </div>
      <div className="my-5 grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-14 gap-y-5">
        {!isLoading && data?.data?.finOrgAccountId && (
          <>
            {data?.data?.email && <h3 className="">Email: {data?.data?.email}</h3>}
            {/* <h3 className="border p-3 rounded-2xl ">
                            Account: {data?.data?.externalAccount}
                        </h3> */}
            {data?.data?.externalAccount?.bank_name && (
              <div>
                <h3 className="text-gray-600">Bank Name</h3>
                <p>{data?.data?.externalAccount.bank_name}</p>
              </div>
            )}
            {data?.data?.externalAccount?.account && (
              <div>
                <h3 className="text-gray-600">Account no</h3>
                <p>{maskAccountNumber(data?.data?.externalAccount.account)}</p>
              </div>
            )}
            {data?.data?.externalAccount?.routing_number && (
              <div>
                <h3 className="text-gray-600">Routing no</h3>
                <p>{data?.data?.externalAccount.routing_number}</p>
              </div>
            )}
            {data?.data?.detailsSubmitted || (
              <Button
                loading={isLoadingAccount}
                className="!bg-primary hover:!bg-primary/80  !text-white !font-bold !py-3 !px-4 !rounded-lg !text-base"
                onClick={handleCreateAccountForStripe}
              >
                Complete Stripe Account Onboarding
              </Button>
              // <button className="bg-primary/90 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg" onClick={handleCreateAccountForStripe}>
              //   Complete Stripe Account Onboarding
              // </button>
            )}
          </>
        )}
        {/*  */}
        {!isLoading && !data?.data?.finOrgAccountId && (
          <div className="  p-3 rounded-2xl ">
            <Button
              loading={isLoadingAccount}
              block
              className="!bg-primary hover:!bg-primary/80  !text-white !font-bold !py-3 !px-4 !rounded-lg !text-base"
              onClick={handleCreateAccountForStripe}
            >
              Create Account For Stripe
            </Button>
            {/* <button
              className="bg-primary/80 hover:bg-primary duration-300 text-white font-bold py-2.5 px-4 rounded-xl"
              onClick={handleCreateAccountForStripe}
            >
              Create Account For Stripe
            </button> */}
          </div>
        )}
        {/*  */}
        {isLoading && (
          <div>
            <Placeholder active={true} />
          </div>
        )}
      </div>
      {/* <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8">
            <h3 className="border p-3 rounded-2xl ">Paypal Merchent Id:{data?.data?.paypalMerchentId}</h3>
          </div> */}
    </>
  );
};

export default BankingCredentials;
