"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

const TenantAuthLayout = ({ children }) => {
  const isAlreadyLoggedIn = isLoggedIn();
  const userDetails = getUserInfo();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAlreadyLoggedIn && userDetails?.role === "TENANT") {
      router.push("/tenant");
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

  if (userDetails?.role !== "TENANT" && !isLoading) return <div>{children}</div>;
};

export default TenantAuthLayout;
