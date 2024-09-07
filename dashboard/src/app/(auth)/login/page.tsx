// "use client";
import LoginPage from "@/components/login/LoginPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your account",
};
const LogIn = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default LogIn;
