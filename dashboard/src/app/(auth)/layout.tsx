"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const DashboardAuthLayout = ({ children }: { children: ReactNode }) => {
  const isAlreadyLoggedIn = isLoggedIn();
  const userDetails: any = getUserInfo();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAlreadyLoggedIn && userDetails?.role === "SUPERADMIN") {
      router.push("/");
    }
    setIsLoading(false);
  }, [isAlreadyLoggedIn, userDetails, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-[60vh] items-center">
        <Loader color="blue" size="xl" />
      </div>
    );
  }

  if (userDetails?.role !== "SUPERADMIN" && !isLoading)
    return <div>{children}</div>;
};

export default DashboardAuthLayout;
