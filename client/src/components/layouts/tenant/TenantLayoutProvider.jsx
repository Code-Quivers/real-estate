"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, Placeholder } from "rsuite";

const TenantLayoutProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const role = getUserInfo()?.role;
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/tenant/login");
    }
    if (userLoggedIn) {
      switch (role) {
        case "PROPERTY_OWNER":
          router.push("/property-owner");
          break;
        case "SERVICE_PROVIDER":
          router.push("/service-provider");
          break;
        default:
          // Handle default case or error
          break;
      }
    }

    setIsLoading(false);
  }, [isLoading, userLoggedIn, router, role]);

  if (isLoading) {
    return (
      <div>
        <Placeholder.Paragraph rows={8} />
        <Loader size="lg" backdrop content="loading..." vertical />
      </div>
    );
  }

  if (userLoggedIn && !isLoading) return <div>{children}</div>;
};

export default TenantLayoutProvider;