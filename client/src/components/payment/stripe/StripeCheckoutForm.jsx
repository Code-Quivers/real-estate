import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader } from "rsuite";

const StripeCheckoutForm = ({ orderData, monthlyChargePerProperty, amountToPaid }) => {
  console.log(orderData, "orderData");
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
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
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/payment/payment-done/${orderData?.orderId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-12 gap-5 mt-5">
        <div className="md:col-span-7 max-md:order-2">
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          {isLoading ? (
            <button className="py-2.5 mt-5 rounded-md font-bold text-lg bg-[#0f193d] hover:bg-black text-white w-full">
              <Loader size="sm" content="" />
            </button>
          ) : (
            <button
              className="py-2.5 mt-5 rounded-md font-bold text-lg bg-[#0f193d] hover:bg-black text-white w-full"
              disabled={isLoading || !stripe || !elements}
              id="submit"
            >
              Pay now
              {/* <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span> */}
            </button>
          )}
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </div>
        <div className="md:col-span-5 max-md:order-1 md:border-l md:border-gray-300 pl-5">
          {orderData?.properties?.map((item, index) => (
            <div key={index} className="flex justify-between w-full mb-2">
              <h1 className="w-2/3">{item?.title}</h1>
              <h1 className="1/3 mr-5">${monthlyChargePerProperty.toFixed(2)}</h1>
            </div>
          ))}
          <hr className="border-gray-300" />
          <div className="">
            <div className="flex justify-between w-full mt-2">
              <h1 className="w-2/3">Total</h1>
              <h1 className="1/3 mr-5 text-2xl font-medium">${amountToPaid.toFixed(2)}</h1>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StripeCheckoutForm;
