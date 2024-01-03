"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, Placeholder } from "rsuite";

const PropertyOwnerProvider = ({ children }) => {
  const role = getUserInfo()?.role;
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/property-owner/login");
    }
    if (userLoggedIn) {
      switch (role) {
        case "SERVICE_PROVIDER":
          router.push("/service-provider");
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

export default PropertyOwnerProvider;
