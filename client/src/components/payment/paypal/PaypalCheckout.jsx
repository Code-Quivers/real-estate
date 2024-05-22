/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

import { getAuthKey, getBaseUrl, paymentClientId, paymentCurrency, paymentDataSdk } from "@/configs/envConfig";
import { useCapturePaypalPaymentMutation, useCreatePaypalPaymentMutation } from "@/redux/features/payment/paypalPaymentApi";
import { useUpdateOrderInfoMutation } from "@/redux/features/orders/orderApi";

const PaypalCheckout = ({ isRentPayment, ownerOrderId, amountToPaid, tenantId, propertyId, ownerId }) => {
  const initialOptions = {
    "client-id": paymentClientId(),
    // "enable-funding": paymentEnableFunding(),
    "data-sdk-integration-source": paymentDataSdk(),
    currency: paymentCurrency(),
  };

  const router = useRouter();
  const [realEstateOrderId, setRealEstateOrderId] = useState(ownerOrderId || "");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [createPaypalPayment, { isError, isLoading, isSuccess }] = useCreatePaypalPaymentMutation();
  const [updateOrderInfo, { data }] = useUpdateOrderInfoMutation();
  const [capturePaypalPayment, { isError: isErrorCapture, isLoading: isLoadingCapture, isSuccess: isSuccessCapture }] =
    useCapturePaypalPaymentMutation();

  const createOrder = async () => {
    try {
      // Prepare payment information
      const paymentInfo = {
        amountToPaid: amountToPaid, // Amount to be paid
        isRentPayment: isRentPayment, // Flag indicating if it's a rent payment
        tenantId: tenantId, // ID of the tenant
        propertyId: propertyId, // ID of the property
        ownerId: ownerId, // ID of the owner
      };

      // Call function to create PayPal payment
      const resp = await createPaypalPayment(paymentInfo);

      // Extract order data from the response
      const orderData = resp?.data?.data;

      // Check if the order ID exists in the response
      if (orderData.id) {
        // Return the order ID if it exists
        return orderData.id;
      } else {
        // If there's an error, construct error message
        const errorDetail = orderData?.details?.[0];
        const errorMessages = errorDetail ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})` : JSON.stringify(orderData);

        // Throw an error with the error message
        throw new Error(errorMessages);
      }
    } catch (err) {
      // Catch and handle any errors
      console.error(err); // Log the error to the console
      setErrorMessage(`Could not initiate PayPal Checkout...${err}`); // Set error message for display
    }
  };

  /**
   * Handles the approval of a PayPal payment.
   */
  // eslint-disable-next-line no-shadow
  const onApprove = async (data, actions) => {
    try {
      // Prepare data to be sent for capturing PayPal payment
      const dataToSend = {
        paypalOrderId: data.orderID,
        orderId: realEstateOrderId,
        tenantId: tenantId,
        propertyId: propertyId,
      };
      // Capture PayPal payment
      const resp = await capturePaypalPayment({ data: dataToSend });

      // Extract order data from the response
      const orderData = resp?.data?.data;

      // Extract error details from the order data
      const errorDetail = orderData?.details?.[0];

      // Handle specific error scenarios
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // Restart the PayPal flow
        return actions.restart();
      } else if (errorDetail) {
        // Throw an error with detailed description and debug ID
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // Handle successful transaction
        const transactionStatus = orderData.paymentStatus;
        setMessage(`Transaction ${transactionStatus}`);

        // Update order status in the database
        updateOrderInfo({
          orderInfo: {
            orderId: orderData?.orderId,
            orderStatus: "CONFIRMED",
            planType: "PREMIUM",
            isRentPayment,
          },
        });

        // Navigate to payment done page
        router.push(`/payment/payment-done/${orderData?.orderId}`);
      }
    } catch (error) {
      // Handle errors gracefully
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
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PaypalCheckout;
