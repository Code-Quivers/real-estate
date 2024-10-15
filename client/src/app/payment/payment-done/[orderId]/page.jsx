/* eslint-disable camelcase */
/* eslint-disable no-extra-boolean-cast */
"use client";

import { useRetrivePaymentInfoMutation } from "@/redux/features/payment/stripePaymentApi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PropertyPaymentDone = ({ params }) => {
  const orderId = params.orderId;
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  // const payment_intent_client_secret = searchParams.get("payment_intent_client_secret");
  const [retrievePaymentInfo, { isLoading, isSuccess }] = useRetrivePaymentInfoMutation();
  useEffect(() => {
    retrievePaymentInfo({ orderId, paymentIntentId: payment_intent });
  }, []);

  return (
    <section className="max-w-6xl max-lg:px-3 pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5 2xl:px-0 ">
      <div>
        <div className="p-6  md:mx-auto">
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p> Have a great day! </p>
            {}
            <div className="py-10 text-center">
              {!isLoading && isSuccess && (
                <Link href="/property-owner/unit-information" className="px-12 bg-primary hover:bg-indigo-700 text-white font-semibold py-3">
                  GO BACK
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyPaymentDone;
