import PaymentTable from "@/components/payment/PaymentTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connected Strip Accounts",
};

const Payment = () => {
  return (
    <div>
      <PaymentTable />
    </div>
  );
};

export default Payment;
