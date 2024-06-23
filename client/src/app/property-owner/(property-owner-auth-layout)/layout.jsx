"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

const PropertyOwnerAuthLayout = ({ children }) => {
  const isAlreadyLoggedIn = isLoggedIn();
  const userDetails = getUserInfo();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAlreadyLoggedIn && userDetails?.role === "PROPERTY_OWNER") {
      router.push("/property-owner");
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

  if (userDetails?.role !== "PROPERTY_OWNER" && !isLoading) return <div>{children}</div>;
};

export default PropertyOwnerAuthLayout;
