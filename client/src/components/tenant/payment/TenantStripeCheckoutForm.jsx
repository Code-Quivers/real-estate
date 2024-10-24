/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader } from "rsuite";
import { getClientUrl } from "@/configs/envConfig";

const TenantStripeCheckoutForm = ({ orderInfo }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("");
          setErrorMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("");
          setErrorMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setMessage("");
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${getClientUrl()}/payment/tenant-payment-done/${orderInfo?.orderId}?connectedAccountId=${orderInfo.connectedAccountId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage(error?.message || "An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div>
        {message && (
          <div className="my-2 bg-green-100 p-2 rounded-sm">
            <p className="font-mono text-green-600 ">aada{message}</p>
          </div>
        )}
        {errorMessage && (
          <div className="mt-2 bg-red-200 p-2 rounded-sm">
            <p className="text-red-600 font-semibold font-mono">{errorMessage}</p>
          </div>
        )}
      </div>
      <button
        disabled={isLoading}
        className={`py-2.5 mt-5 rounded-md font-bold text-lg bg-[#0f193d] text-white w-full flex justify-center items-center
    ${isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-black"}`}
        id="submit"
      >
        {isLoading ? (
          <>
            <Loader size="sm" className="mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </button>

      {/* <button className="border p-3" disabled={isLoading || !stripe || !elements} id="submit">
        Pay now
      </button> */}
      {/* Show any error or success messages */}
      {/* {message && (
        <div id="payment-message" className="text-red-600">
          {message}
        </div>
      )} */}
    </form>
  );
};

export default TenantStripeCheckoutForm;
