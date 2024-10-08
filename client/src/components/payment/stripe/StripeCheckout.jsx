/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { useGetClientSecretMutation } from "@/redux/features/payment/stripePaymentApi";
import { getStripePKLive } from "@/configs/envConfig";
const stripePromise = loadStripe(getStripePKLive());

const StripeCheckout = ({ ownerOrderedId, amountToPaid, orderData, ...others }) => {
  const [getClientSecret, { data, isError, isLoading }] = useGetClientSecretMutation();
  const [clientSecret, setClientSecret] = useState("");
  console.log("srvsrvsrv", orderData, others);

  const fetchClientSecret = async () => {
    const resp = await getClientSecret({ ownerOrderedId, amountToPaid, orderData, ...others });

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
    <div className="min-h-[280px]">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckoutForm orderData={orderData} />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
