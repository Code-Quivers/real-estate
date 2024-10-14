"use client";
import StripeCheckout from "@/components/payment/stripe/StripeCheckout";
import { fileUrlKey, getUnitPackagePrices } from "@/configs/envConfig";
import { useGetSingleOrderQuery, useUpdatePropertyTrialPeriodMutation } from "@/redux/features/orders/orderApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdSearchOff } from "react-icons/md";
import { Button, Loader, Modal, Notification, Panel, Tabs, useToaster } from "rsuite";
import apartmentPhoto from "@/assets/house/house-logo.jpg";
import { BiLeftArrowAlt } from "react-icons/bi";

const UnitPaymentPage = ({ params }) => {
  const router = useRouter();
  const toaster = useToaster();
  const [isOpenFreeTrial, setIsOpenFreeTrial] = useState(false);
  const [activePackagePrice, setActivePackagePrice] = useState("MONTHLY");
  const searchParam = useSearchParams();
  const searchParams = searchParam.get("paymentMethod");
  const isPropertyCreating = searchParam.get("isPropertyCreating");

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
        <Notification header="Success" type="success" closable>
          {dataTrial?.message || "Successfully Activated"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 3000,
        },
      );

      router.push(`/property-owner/unit-information`);
      resetReq();
    }
    if (!isLoadingTrial && isErrorTrial && !isSuccessTrial) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          {errorTrial?.message || "Failed to Activate"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 3000,
        },
      );
    }
  }, [isLoadingTrial, isErrorTrial, isSuccessTrial, errorTrial, router, resetReq, toaster]);
  //

  return (
    <section className="max-w-5xl  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5 2xl:px-0 ">
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
          <div>
            <Panel>
              <Tabs appearance="tabs" activeKey={activePackagePrice} onSelect={setActivePackagePrice}>
                <Tabs.Tab disabled={searchParams === "stripe-payment"} eventKey="MONTHLY" title="Monthly">
                  <h2 className="text-xl">You will be charged ${getUnitPackagePrices().MONTHLY}/month for each property you add.</h2>
                </Tabs.Tab>
                <Tabs.Tab disabled={searchParams === "stripe-payment"} eventKey="BIANNUALLY" title="6 Month Plan">
                  <h2 className="text-xl">You will be charged ${getUnitPackagePrices().BIANNUALLY}/half year for each property you add</h2>
                </Tabs.Tab>
                <Tabs.Tab disabled={searchParams === "stripe-payment"} eventKey="ANNUALLY" title="Annual Plan">
                  <h2 className="text-xl">You will be charged ${getUnitPackagePrices().ANNUALLY}/year for each property you add.</h2>
                </Tabs.Tab>
              </Tabs>
            </Panel>
          </div>
          {/* order details */}

          <div className="mt-5 space-y-3 ">
            {orderDetails?.data?.properties?.map((singleProperty) => (
              <div key={Math.random()} className="flex justify-between items-center border  p-2 shadow-md bg-white rounded-lg">
                <div className="flex gap-3 items-center">
                  <Image
                    width={100}
                    height={100}
                    src={singleProperty?.images?.length ? `${fileUrlKey()}/${singleProperty?.images[0]}` : apartmentPhoto}
                    className="rounded-md !w-[100px] !h-[80px] object-cover object-center"
                    alt=""
                  />
                  <div>
                    <h2 className="text-lg text-wrap">{singleProperty?.title}</h2>
                    <h2 className="text-lg text-wrap">
                      {singleProperty?.numOfBed} Beds {singleProperty?.numOfBath} Baths
                    </h2>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800">${getUnitPackagePrices()[activePackagePrice]}</h2>
                </div>
              </div>
            ))}

            {/* total */}
            <div>
              <div className=" mt-10  bg-white  p-5">
                <div className="">
                  <div className="flex justify-between w-full mt-2">
                    <h1 className="w-2/3">Total</h1>
                    <h1 className="1/3 mr-5 text-2xl font-medium">
                      ${(getUnitPackagePrices()[activePackagePrice] * orderDetails?.data?._count?.properties).toLocaleString()}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* paypal or payment method */}
          <div className="mt-7">
            {searchParams === "stripe-payment" ? (
              <div>
                <StripeCheckout
                  amountToPaid={parseInt(getUnitPackagePrices()[activePackagePrice]) * orderDetails?.data?._count?.properties}
                  orderData={orderDetails?.data}
                  propertyIds={orderDetails?.data?.properties.map((property) => property?.propertyId)}
                  packagePrice={parseInt(getUnitPackagePrices()[activePackagePrice])}
                  totalAmountToPay={parseInt(getUnitPackagePrices()[activePackagePrice]) * orderDetails?.data?._count?.properties}
                  orderId={orderDetails?.data?.orderId}
                  packageType={activePackagePrice}
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <Link
                  href={{
                    query: { paymentMethod: "stripe-payment", isPropertyCreating: isPropertyCreating === "1" ? "1" : "0" },
                  }}
                  className="border w-full  bg-primary hover:bg-primary/80 duration-300 text-center p-10 text-xl py-4 rounded-lg text-white"
                >
                  Pay with Stripe
                </Link>
              </div>
            )}
          </div>
          {/* activate a free trial */}
          <div className="mt-10 text-center flex justify-between items-center">
            <div>
              {searchParams === "stripe-payment" && (
                <Link
                  href={
                    (`/property-owner/unit-information/payment/${params?.orderId}`,
                    {
                      query: {
                        isPropertyCreating: isPropertyCreating === "1" ? "1" : "0",
                      },
                    })
                  }
                  className="  border rounded-2xl hover:bg-gray-200 px-3 py-1 flex items-center gap-1"
                >
                  <BiLeftArrowAlt /> Back
                </Link>
              )}
            </div>
            <div>
              {isPropertyCreating === "1" && (
                <button type="button" onClick={() => setIsOpenFreeTrial(true)} className="hover:underline text-primary">
                  Activate a 1 month free-trial
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* is loading */}
      {isOrderLoading && (
        <div className="min-h-[65vh] flex justify-center items-center">
          <Loader size="lg" content="Loading Order Info..." />
        </div>
      )}

      <>
        <Modal
          // dialogAs="div"
          overflow={false}
          className="bg-white mx-auto  rounded-lg"
          open={isOpenFreeTrial}
          backdrop={true}
          size={"md"}
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
                  <li>However, you can choose to subscribe at any time to unlock full access and continue using the service without interruption.</li>
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
    </section>
  );
};

export default UnitPaymentPage;
