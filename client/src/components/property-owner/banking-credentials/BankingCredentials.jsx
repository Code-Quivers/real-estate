"use client";

import { useCreateAccountLinkMutation, useCreateConnectedAccountMutation } from '@/redux/features/payment/stripePaymentApi';
import { useGetFinancialInfoQuery } from '@/redux/features/propertyOwner/propertyOwnerApi';
import { useRouter } from 'next/navigation';
import React from 'react'

const BankingCredentials = () => {
    const router = useRouter()

    const { data, isLoading, isError } = useGetFinancialInfoQuery()
    console.log(data, 'inside of bankgin details...........')
    const [createConnectedAccount, { data: connectedAccountData }] = useCreateConnectedAccountMutation();
    const [createAccountLink, { data: linkedAccountData }] = useCreateAccountLinkMutation();
    console.log(data, '--------')


    const handleCreateAccountForStripe = async () => {
        let resp = null;
        if (data?.data?.user?.FinancialAccount?.finOrgAccountId) {
            resp = await createAccountLink({ sConnectedAccountId: data?.data?.user?.FinancialAccount?.finOrgAccountId })
        } else {
            resp = await createConnectedAccount({})
        }
        console.log(resp, "first-->>>>>>>>>>>>>>>>>>")
        router.push(resp?.data?.data?.url)
    }
    return (
        <>
            <div>
                <h4 className="text-xl font-medium">Credentials of Getting Money</h4>
            </div>
            <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8">
                {console.log(data?.data?.finOrgAccountId)}
                {data?.data?.finOrgAccountId &&
                    <>
                        <h3 className="border p-3 rounded-2xl border-[#707070]">
                            Email: {data?.data?.email}
                        </h3>
                        {/* <h3 className="border p-3 rounded-2xl border-[#707070]">
                            Account: {data?.data?.externalAccount}
                        </h3> */}
                        {
                            data?.data?.externalAccount?.bank_name &&
                            (<h3 className="border p-3 rounded-2xl border-[#707070]">
                                Bank Name: {data?.data?.externalAccount.bank_name}
                            </h3>
                            )
                        }
                        {
                            data?.data?.externalAccount?.account &&
                            (<h3 className="border p-3 rounded-2xl border-[#707070]">
                                Account No: {data?.data?.externalAccount.account}
                            </h3>
                            )
                        }
                        {
                            data?.data?.externalAccount?.routing_number &&
                            (<h3 className="border p-3 rounded-2xl border-[#707070]">
                                Routing No: {data?.data?.externalAccount.routing_number}
                            </h3>
                            )
                        }
                        {
                            (data?.data?.detailsSubmitted) ||
                            (<button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleCreateAccountForStripe}
                            >
                                Complete Stripe Account Onboarding
                            </button>
                            )
                        }


                    </>
                }

                {!(data?.data?.finOrgAccountId) &&
                    <h3 className="border p-3 rounded-2xl border-[#707070]">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCreateAccountForStripe}
                        >
                            Create Account For Stripe
                        </button>
                    </h3>
                }
            </div>
            {/* <div className="my-5 grid  grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8">
            <h3 className="border p-3 rounded-2xl border-[#707070]">Paypal Merchent Id:{data?.data?.paypalMerchentId}</h3>
          </div> */}
        </>
    )
}

export default BankingCredentials