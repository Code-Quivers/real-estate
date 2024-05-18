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

      {singleProperty?.planType === "PREMIUM" && (
        <div>
          {getPackageExpiredDates(singleProperty?.paidTo).hasExpired && (
            <div className="space-y-3">
              <h2 className="text-md font-medium">
                {!getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
                  ? "Your unit package expired. Your unit will be disabled next month."
                  : "Your Unit Package is Fully Expired. Please Pay, Otherwise you can't get anything"}
              </h2>
              <button onClick={handleCreateNewOrder} className="bg-primary px-5 py-2 rounded-3xl text-white">
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
