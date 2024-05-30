"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

const ServiceProviderLayoutProvider = ({ children }) => {
  const role = getUserInfo()?.role;
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/service-provider/login");
    }

    // if logged in
    if (userLoggedIn && role !== "SERVICE_PROVIDER") {
      router.push("/service-provider/login");
    }

    setIsLoading(false);
  }, [isLoading, userLoggedIn, router]);

  if (isLoading) {
    return (
      <div>
        <Loader size="lg" backdrop content="loading..." vertical />
      </div>
    );
  }
  if (userLoggedIn && role === "SERVICE_PROVIDER" && !isLoading) return <div>{children}</div>;
};

export default ServiceProviderLayoutProvider;
