"use client";

import StripeCheckout from "@/components/payment/stripe/StripeCheckout";
import { useGetSingleOrderQuery, useUpdatePropertyTrialPeriodMutation } from "@/redux/features/orders/orderApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdSearchOff } from "react-icons/md";
import { Button, Loader, Message, Modal, useToaster } from "rsuite";

const UnitPaymentPage = ({ params }) => {
  const router = useRouter();
  const toaster = useToaster();
  const [isOpenFreeTrial, setIsOpenFreeTrial] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [monthlyChargePerProperty, setMonthlyChargePerProperty] = useState(20.0);
  const {
    data: orderDetails,
    isLoading: isOrderLoading,
    isError: isOrderError,
    error: orderError,
  } = useGetSingleOrderQuery(
    { orderId: params.orderId },
    {
      skip: !params.orderId,
    },
  );
  // ! update property to trial period
  const [
    updatePropertyTrialPeriod,
    { data: dataTrial, isLoading: isLoadingTrial, isSuccess: isSuccessTrial, isError: isErrorTrial, error: errorTrial, reset: resetReq },
  ] = useUpdatePropertyTrialPeriodMutation();

  useEffect(() => {
    if (!isLoadingTrial && !isErrorTrial && isSuccessTrial && !errorTrial) {
      toaster.push(
        <Message centered showIcon type="success" closable>
          {dataTrial?.message || "Successfully Activated"}
        </Message>,
        {
          placement: "topEnd",
          duration: 3000,
        },
      );

      router.push(`/property-owner/unit-information`);
      resetReq();
    }
    if (!isLoadingTrial && isErrorTrial && !isSuccessTrial) {
      toaster.push(
        <Message centered showIcon type="error" closable>
          {errorTrial?.message || "Failed to Activate"}
        </Message>,
        {
          placement: "topEnd",
          duration: 3000,
        },
      );
    }
  }, [isLoadingTrial, isErrorTrial, isSuccessTrial, errorTrial, router, resetReq, toaster]);

  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5 2xl:px-0 ">
      <div className=" flex justify-center  items-stretch gap-5 ">
        <Button type="button" className={`     !px-12 !py-4 !bg-[#29429f] !text-white !rounded-full `} size="lg" appearance="default">
          Payment
        </Button>
      </div>
      {/* if order not found */}
      <div>
        {!isOrderLoading && isOrderError && (
          <div className="min-h-[65vh]  flex justify-center items-center">
            <div className="text-center  flex flex-col justify-center items-center">
              <div>
                <span>
                  <MdSearchOff color="#f8c012" size={100} />
                </span>
              </div>
              <div className="mt-5 space-y-4">
                <h2 className="font-semibold uppercase text-3xl">{orderError?.message || "No order Found"}</h2>
                <p className="text-[#b9b9b9]">{`Looks like you haven't made your order yet`}</p>
              </div>
              <div className="w-full flex justify-center mt-14">
                <button
                  onClick={() => router.push("/property-owner/unit-information")}
                  className="flex items-center justify-center gap-2 bg-[#f8c012] w-[80%] rounded-full py-2 text-sm"
                >
                  <IoChevronBackSharp size={18} /> Back to Unit Information
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* if order exist */}
      {!isOrderLoading && !isOrderError && (
        <div className="mt-10">
          <div className="text-center space-y-3">
            <h2 className="text-xl ">Payment</h2>
            <h2 className="text-xl ">You will be charged {monthlyChargePerProperty}$/month for each property you add.</h2>
          </div>
          {/* paypal or payment method */}
          <div>
            {console.log(orderDetails)}

            <StripeCheckout
              ownerOrderedId={orderDetails?.data?.orderId}
              amountToPaid={monthlyChargePerProperty * orderDetails?.data?._count?.properties}
              orderData={orderDetails?.data}
              monthlyChargePerProperty={monthlyChargePerProperty}
            />
          </div>
          {/* activate a free trial */}
          <div className="mt-10 text-center">
            <button onClick={() => setIsOpenFreeTrial(true)} className="hover:underline">
              Activate a 1 month free-trial
            </button>

            <>
              <Modal
                dialogAs="div"
                overflow={false}
                className="bg-white mx-auto my-auto mt-10 rounded-lg"
                open={isOpenFreeTrial}
                backdrop={true}
                size={800}
              >
                <Modal.Body>
                  <div>
                    <h2 className="text-center text-xl pt-5 font-bold text-gray-900">Free Trial Activation</h2>
                    <div className="pl-10 mb-1">
                      <h2 className="font-semibold">Trial Period:</h2>
                      <ul className="list-disc">
                        <li>{`Your trial period will last for 30 days from today's date.`}</li>
                        <li>During this time, you can explore and utilize all functionalities without any restrictions.</li>
                      </ul>
                    </div>

                    <div className="pl-10 mb-1">
                      <h2 className="font-semibold">Activation Details:</h2>
                      <ul className="list-disc">
                        <li>Your free trial is now active and will be valid starting from this moment.</li>
                        <li>You have full access to all features and properties for the duration of the trial period.</li>
                      </ul>
                    </div>
                    <div className="pl-10 mb-1">
                      <h2 className="font-semibold">Important Note:</h2>{" "}
                      <ul className="list-disc">
                        <li>
                          {`
                      After the trial period ends, you won't be able to update or make changes to any properties or settings associated with your
                      account.
                     
                     `}
                        </li>
                        <li>
                          However, you can choose to subscribe at any time to unlock full access and continue using the service without interruption.
                        </li>
                      </ul>
                    </div>
                    <div className="mt-3 ml-10">
                      <span className="text-xs">
                        {`
                    We'll remind you before your trial ends, so you can decide whether to subscribe and keep enjoying our services hassle-free.
                    `}
                      </span>
                    </div>
                    {/*  */}

                    <div className="mt-10 flex justify-center items-center gap-5">
                      <button onClick={() => setIsOpenFreeTrial(false)} className="border-gray-400 border px-5 py-2 rounded-full">
                        Back
                      </button>
                      <Button
                        disabled={!params?.orderId}
                        loading={isLoadingTrial}
                        onClick={() => {
                          updatePropertyTrialPeriod({
                            orderId: params.orderId,
                          });
                        }}
                        className="!bg-primary !px-5 !py-2.5 !text-white !rounded-full"
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          </div>
        </div>
      )}
      {/* is loading */}
      {isOrderLoading && (
        <div className="min-h-[65vh] flex justify-center items-center">
          <Loader size="lg" content="Loading Order Info..." />
        </div>
      )}
    </section>
  );
};

export default UnitPaymentPage;
