"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

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
      if (userLoggedIn && role === "PROPERTY_OWNER") {
        router.push("/property-owner");
      } else {
        router.push("/property-owner/login");
      }
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

  if (userLoggedIn && !isLoading) return <div>{children}</div>;
};

export default PropertyOwnerProvider;
