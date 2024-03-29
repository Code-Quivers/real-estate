import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

import { getAuthKey, getBaseUrl, paymentClientId, paymentCurrency, paymentDataSdk } from "@/configs/envConfig";
import { useCapturePaypalPaymentMutation, useCreatePaypalPaymentMutation } from "@/redux/features/payment/paypalPaymentApi";
import { useUpdateOrderInfoMutation } from "@/redux/features/orders/orderApi";

const PaypalCheckout = ({ realestateOrderId, amountToPaid }) => {
  const initialOptions = {
    "client-id": paymentClientId(),
    // "enable-funding": paymentEnableFunding(),
    "data-sdk-integration-source": paymentDataSdk(),
    currency: paymentCurrency(),
  };
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createPaypalPayment, { isError, isLoading, isSuccess }] = useCreatePaypalPaymentMutation();
  const [updateOrderInfo, { data }] = useUpdateOrderInfoMutation();
  const [capturePaypalPayment, { isError: isErrorCapture, isLoading: isLoadingCapture, isSuccess: isSuccessCapture }] =
    useCapturePaypalPaymentMutation();
  const createOrder = async () => {
    try {
      const resp = await createPaypalPayment({ id: realestateOrderId, amount: amountToPaid });
      const orderData = resp?.data?.data;
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})` : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error(error);
      setErrorMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  };
  const onApprove = async (data, actions) => {
    try {
      const dataToSend = {
        paypalOrderId: data.orderID,
        orderId: realestateOrderId,
      };
      const resp = await capturePaypalPayment({ data: dataToSend });

      const orderData = resp?.data?.data;

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transactionStatus = orderData.paymentStatus;
        setMessage(`Transaction ${transactionStatus}`);

        // Update order status in DB
        updateOrderInfo({
          orderInfo: { orderId: realestateOrderId, orderStatus: 'CONFIRMED', planType: 'PREMIUM' }

        })

        // Navigate to payment done page.
        router.push(`/payment/payment-done/${realestateOrderId}`);

        // showing toast
        // console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`Sorry, your transaction could not be processed...${error}`);
    }
  };
  return (
    <div className=" max-lg:px-5 w-full py-10 ">
      <div className="grid grid-cols-2 gap-5 w-full">
        <div>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{
                shape: "rect",
                disableMaxWidth: false,

                //color:'blue' change the default color of the buttons
                layout: "vertical", //default value. Can be changed to horizontal
              }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </PayPalScriptProvider>
        </div>
        <div>Details About ....</div>
      </div>
      <div>
        {/* <div className="mt-10 flex justify-start">
          <button
            onClick={onPrevious}
            className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 flex items-center gap-3  justify-center uppercase font-mono rounded-full"
          >
            <FiChevronLeft size={20} /> Back
          </button>
        </div> */}
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PaypalCheckout;
