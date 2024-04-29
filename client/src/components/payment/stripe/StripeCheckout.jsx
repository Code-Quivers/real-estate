/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { useGetClientSecretMutation } from "@/redux/features/payment/stripePaymentApi";

// import StripeCheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51P3kzDBMbxBFdGaf2ImAX1HZlT3qNa2iQMfFrCjCwHEQllcgo92Nr5aFGdpJArxffsEjmUVgn8yCZawyFQbEW0op00XKGrzUfN");

const StripeCheckout = ({ ownerOrderedId, amountToPaid, orderData, monthlyChargePerProperty }) => {
  const [getClientSecret, { data, isError, isLoading }] = useGetClientSecretMutation();
  const [clientSecret, setClientSecret] = useState("");

  const fetchClientSecret = async () => {
    const resp = await getClientSecret({ ownerOrderedId, amountToPaid, orderData });

    if (resp?.data?.data?.clientSecret) {
      setClientSecret(resp.data?.data?.clientSecret);
    }
  };

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm orderData={orderData} monthlyChargePerProperty={monthlyChargePerProperty} amountToPaid={amountToPaid} />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
