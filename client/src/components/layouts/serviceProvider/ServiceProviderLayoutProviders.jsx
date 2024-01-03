"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, Placeholder } from "rsuite";

const ServiceProviderLayoutProvider = ({ children }) => {
  const role = getUserInfo()?.role;
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/service-provider/login");
    }
    if (userLoggedIn) {
      switch (role) {
        case "PROPERTY_OWNER":
          router.push("/property-owner");
          break;
        case "TENANT":
          router.push("/tenant");
          break;
        default:
          // Handle default case or error
          break;
      }
    }

    setIsLoading(false);
  }, [isLoading, userLoggedIn, router]);

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

export default ServiceProviderLayoutProvider;
