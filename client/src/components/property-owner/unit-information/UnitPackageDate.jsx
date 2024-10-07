"use client";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import { getPackageExpiredDates } from "@/utils/GetDateCalculation";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Notification, useToaster } from "rsuite";

const UnitPackageDate = ({ singleProperty }) => {
  const [createOrder, { data, isLoading, isSuccess, isError, error }] = useCreateOrderMutation();
  const router = useRouter();

  const handleCreateNewOrder = async () => {
    await createOrder({
      data: { properties: [singleProperty?.propertyId] },
    });
  };
  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoading && !isError && isSuccess && !error) {
      router.push(`/property-owner/unit-information/payment/${data?.data?.orderId}`);
    }
    if (!isLoading && isError && !isSuccess) {
      toaster.push(
        <Notification header="Error" type="error" closable>
          {error?.message || "Failed to Create"}
        </Notification>,
        {
          placement: "bottomStart",
          duration: 3000,
        },
      );
    }
  }, [isLoading, isError, isSuccess, error, router, toaster]);

  return (
    <div>
      {/* if on trial */}
      {singleProperty?.planType === "ON_TRIAL" && (
        <div>
          {getPackageExpiredDates(singleProperty?.createdAt).moreThanOneMonthExpired ? (
            <div className="space-y-3">
              <h2 className="text-md font-medium text-red-600">Your Trial Period is Fully Expired. Please Pay, Otherwise you cant get anything</h2>
              <button onClick={handleCreateNewOrder} className="bg-primary px-5 py-2 rounded-3xl text-white">
                Pay Now
              </button>
            </div>
          ) : (
            <h2 className="text-sm ">trial period is activated since - {moment(singleProperty?.createdAt).format("LL")}</h2>
          )}
        </div>
      )}
      {/* for premium */}
      {singleProperty?.planType === "PREMIUM" && (
        <div>
          {singleProperty?.pendingPaidTo && (
            <div className="space-y-4 bg-yellow-50 border border-yellow-300 rounded-lg p-4    shadow-md">
              <h2 className="text-lg font-semibold text-yellow-800">Your Payment is Being Processed</h2>
              <p className="text-sm text-gray-700">
                Thank you for your recent payment. We’ve received your payment request, but please note that bank payments take a few days to verify.
              </p>
              <div className="flex items-center">
                <span className="bg-yellow-300 text-yellow-900 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Status: Payment Pending</span>
              </div>
              <p className="text-sm text-gray-700">
                You’ll receive an email notification once the payment has been successfully confirmed. In the meantime, feel free to continue browsing
                or reach out to us if you have any questions.
              </p>
              <p className="text-sm text-gray-700 font-medium">Thank you for your patience!</p>
            </div>
          )}

          {/*  */}
          {!singleProperty?.pendingPaidTo && getPackageExpiredDates(singleProperty?.paidTo).hasExpired && (
            <div className="space-y-4 bg-red-50 border border-red-300 rounded-lg p-3 shadow-md">
              <h2 className="text-lg font-semibold text-red-800">
                {!getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
                  ? "Your unit package has expired. Your unit will be disabled next month."
                  : "Your unit package is fully expired. Please pay, otherwise you will lose access."}
              </h2>
              <button
                onClick={handleCreateNewOrder}
                className="bg-primary text-white font-medium px-6 py-2 rounded-full shadow hover:bg-primary-dark transition duration-200"
              >
                Pay Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitPackageDate;
