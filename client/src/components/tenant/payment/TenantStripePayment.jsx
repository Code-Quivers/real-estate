import React, { useState, useEffect } from "react";
import { Loader } from "rsuite";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useGetTenantClientSecretMutation } from "@/redux/features/payment/stripePaymentApi";
import TenantStripeCheckoutForm from "./TenantStripeCheckoutForm";
import { getStripePKLive } from "@/configs/envConfig";

// import StripeCheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
let stripePromise = loadStripe(getStripePKLive());
// charge={dueRent * 0.04}
//               netAmount={dueRent}

const TenantStripeCheckout = ({ isRentPayment, amountToPaid, propertyId, tenantId, ownerId, charge, netAmount }) => {
  const [getTenantClientSecret, { data, isError, isLoading, isSuccess, error }] = useGetTenantClientSecretMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [orderInfo, setOrderInfo] = useState({});

  const fetchClientSecret = async () => {
    const resp = await getTenantClientSecret({ tenantId, propertyId, isRentPayment, amountToPaid, ownerId, charge, netAmount });
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { clientSecret: cs, connectedAccountId, orderId } = resp?.data?.data;
    if (cs && connectedAccountId) {
      stripePromise = loadStripe(getStripePKLive(), {
        stripeAccount: connectedAccountId,
      });
      setClientSecret(cs);
      setOrderInfo({
        connectedAccountId,
        orderId,
      });
    }
  };

  useEffect(() => {
    fetchClientSecret();
  }, []);
  //   fetchClientSecret();

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  let content;
  if (data && clientSecret && !isLoading) {
    content = (
      <Elements options={options} stripe={stripePromise}>
        <TenantStripeCheckoutForm orderInfo={orderInfo} />
      </Elements>
    );
  }
  if (isLoading) {
    content = (
      <div className="flex flex-col justify-center items-center   min-h-[220px]">
        <Loader center size="md" content="loading" />
      </div>
    );
  }

  if (isError && !isLoading && error && !isSuccess) {
    content = (
      <div>
        <p className="bg-red-200 text-red-600 p-5">{error?.message || "Something went wrong"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-5">
      <div>{content}</div>
    </div>
  );
};

export default TenantStripeCheckout;
