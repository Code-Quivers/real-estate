import React, { useState, useEffect } from "react";
import { Loader } from 'rsuite';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useGetClientSecretMutation, useGetTenantClientSecretMutation } from "@/redux/features/payment/stripePaymentApi";
import TenantStripeCheckoutForm from "./TenantStripeCheckoutForm";

// import StripeCheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
let stripePromise = loadStripe(
    "pk_test_51P3kzDBMbxBFdGaf2ImAX1HZlT3qNa2iQMfFrCjCwHEQllcgo92Nr5aFGdpJArxffsEjmUVgn8yCZawyFQbEW0op00XKGrzUfN",

);

const TenantStripeCheckout = ({ isRentPayment, amountToPaid, propertyId, tenantId, ownerId }) => {

    const [getTenantClientSecret, { data, isError, isLoading }] = useGetTenantClientSecretMutation();
    const [clientSecret, setClientSecret] = useState("");
    const [orderInfo, setOrderInfo] = useState({});


    const fetchClientSecret = async () => {
        const resp = await getTenantClientSecret({ tenantId, propertyId, isRentPayment, amountToPaid, ownerId });
        const { clientSecret: cs, connectedAccountId, orderId } = resp?.data?.data
        if (cs && connectedAccountId) {
            stripePromise = loadStripe(
                "pk_test_51P3kzDBMbxBFdGaf2ImAX1HZlT3qNa2iQMfFrCjCwHEQllcgo92Nr5aFGdpJArxffsEjmUVgn8yCZawyFQbEW0op00XKGrzUfN",
                {
                    stripeAccount: connectedAccountId
                }
            );
            setClientSecret(cs);
            setOrderInfo({
                connectedAccountId, orderId
            })
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
                    <TenantStripeCheckoutForm orderInfo={orderInfo} />
                </Elements>
            )}
            {!(clientSecret) && <Loader center size="md" content="loading" />}
        </div>
    );
};

export default TenantStripeCheckout;
