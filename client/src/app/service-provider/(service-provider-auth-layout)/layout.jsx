"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

const ServiceProviderAuthLayout = ({ children }) => {
  const isAlreadyLoggedIn = isLoggedIn();
  const userDetails = getUserInfo();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAlreadyLoggedIn && userDetails?.role === "SERVICE_PROVIDER") {
      router.push("/service-provider");
    }
    setIsLoading(false);
  }, [isAlreadyLoggedIn, userDetails, router]);

  if (isLoading) {
    return (
      <div>
        <Loader size="lg" backdrop content="loading..." vertical />
      </div>
    );
  }

  if (userDetails?.role !== "SERVICE_PROVIDER" && !isLoading) return <div>{children}</div>;
};

export default ServiceProviderAuthLayout;
