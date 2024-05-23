"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

const TenantLayoutProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const role = getUserInfo()?.role;
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/tenant/login");
    }

    if (userLoggedIn && role !== "TENANT") {
      router.push("/tenant/login");
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

  if (userLoggedIn && role === "TENANT" && !isLoading) return <div>{children}</div>;
};

export default TenantLayoutProvider;
