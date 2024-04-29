/* eslint-disable no-unused-vars */
"use client";

import { useCreateAccountLinkMutation, useCreateConnectedAccountMutation } from "@/redux/features/payment/stripePaymentApi";
import { useGetFinancialInfoQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { useRouter } from "next/navigation";
import React from "react";
import { Placeholder } from "rsuite";

const BankingCredentials = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetFinancialInfoQuery();
  // console.log(data, "inside of bankgin details...........");
  const [createConnectedAccount, { data: connectedAccountData }] = useCreateConnectedAccountMutation();
  const [createAccountLink, { data: linkedAccountData }] = useCreateAccountLinkMutation();

  const handleCreateAccountForStripe = async () => {
    let resp = null;
    if (data?.data?.finOrgAccountId) {
      resp = await createAccountLink({ sConnectedAccountId: data?.data?.finOrgAccountId });
    } else {
      resp = await createConnectedAccount({});
    }
    router.push(resp?.data?.data?.url);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-medium">Credentials of Getting Money</h4>
        <p className="font-medium max-lg:hidden">Card Information</p>
      </div>
      <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-14 gap-y-8">
        {!isLoading && data?.data?.finOrgAccountId && (
          <>
            {data?.data?.externalAccount?.email && <h3 className="border p-3 rounded-2xl ">Email: {data?.data?.email}</h3>}
            {/* <h3 className="border p-3 rounded-2xl ">
                            Account: {data?.data?.externalAccount}
                        </h3> */}
            {data?.data?.externalAccount?.bank_name && <h3 className="border p-3 rounded-2xl">Bank Name: {data?.data?.externalAccount.bank_name}</h3>}
            {data?.data?.externalAccount?.account && <h3 className="border p-3 rounded-2xl">Account No: {data?.data?.externalAccount.account}</h3>}
            {data?.data?.externalAccount?.routing_number && (
              <h3 className="border p-3 rounded-2xl">Routing No: {data?.data?.externalAccount.routing_number}</h3>
            )}
            {data?.data?.detailsSubmitted || (
              <button className="bg-primary/90 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg" onClick={handleCreateAccountForStripe}>
                Complete Stripe Account Onboarding
              </button>
            )}
          </>
        )}
        {/*  */}
        {!isLoading && !data?.data?.finOrgAccountId && (
          <h3 className="border p-3 rounded-2xl ">
            <button
              className="bg-primary/80 hover:bg-primary duration-300 text-white font-bold py-2.5 px-4 rounded-xl"
              onClick={handleCreateAccountForStripe}
            >
              Create Account For Stripe
            </button>
          </h3>
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
