"use client";
import { getUserInfo, isLoggedIn } from "@/hooks/services/auth.service";
import { Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomeLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  // @ts-ignore
  const role = getUserInfo()?.role;
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  //
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }

    if (userLoggedIn && role !== "SUPERADMIN") {
      router.push("/login");
    }

    setIsLoading(false);
  }, [isLoading, userLoggedIn, router, role]);

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-[60vh] items-center">
        <Loader color="blue" size="xl" />
      </div>
    );
  }

  if (userLoggedIn && role === "SUPERADMIN" && !isLoading)
    return <div>{children}</div>;
};

export default HomeLayoutProvider;
