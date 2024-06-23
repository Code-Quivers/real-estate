/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { useGetClientSecretMutation } from "@/redux/features/payment/stripePaymentApi";
import { getStripePKLive } from "@/configs/envConfig";

// import StripeCheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// const stripePromise = loadStripe("pk_test_51P3kzDBMbxBFdGaf2ImAX1HZlT3qNa2iQMfFrCjCwHEQllcgo92Nr5aFGdpJArxffsEjmUVgn8yCZawyFQbEW0op00XKGrzUfN");
const stripePromise = loadStripe(getStripePKLive());


//  amountToPaid={parseInt(getUnitPackagePrices()[activePackagePrice]) * orderDetails?.data?._count?.properties}
//                 orderData={orderDetails?.data}
//                 propertyIds={orderDetails?.data?.properties.map((property) => property?.propertyId)}
//                 packagePrice={parseInt(getUnitPackagePrices()[activePackagePrice])}
//                 totalAmountToPay={parseInt(getUnitPackagePrices()[activePackagePrice]) * orderDetails?.data?._count?.properties}
//                 orderId={orderDetails?.data?.orderId}
//                 packageType={activePackagePrice}

const StripeCheckout = ({ ownerOrderedId, amountToPaid, orderData, ...others }) => {
  const [getClientSecret, { data, isError, isLoading }] = useGetClientSecretMutation();
  const [clientSecret, setClientSecret] = useState("");

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
