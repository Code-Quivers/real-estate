"use client";

import Link from "next/link";
import Tenants from "../assets/icons/Tenants";
import { ActionIcon, Avatar, Tooltip } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { getAuthKey } from "@/helpers/config/envConfig";
import { baseApi } from "@/redux/api/baseApi";

const SidebarMenu = () => {
  const router = useRouter();

  // Clear all caches
  const dispatch = useDispatch();

  const logOut = async () => {
    router.push("/login");
    removeUserInfo(getAuthKey());
    dispatch(baseApi.util.resetApiState());
  };
  return (
    <>
      <nav className="mt-16 flex flex-col h-full justify-between">
        <div className="flex flex-col">
          <Link
            href="/tenants"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Tenant
          </Link>
          <Link
            href="/property-owner"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Property Owner
          </Link>
          <Link
            href="/properties"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Properties
          </Link>
        </div>
        <div className="flex items-center mb-10 px-3 gap-2 border-t pt-2">
          <Avatar color="cyan" radius="xl">
            MK
          </Avatar>
          <div className="text-sm">
            <p className="line-clamp-1">Muhammad Kudrat</p>
            <p className="line-clamp-1 text-xs">@superadmin</p>
          </div>
          <Tooltip label="Logout" position="top">
            <ActionIcon variant="subtle" size="lg">
              <IconLogout onClick={logOut} size={24} />
            </ActionIcon>
          </Tooltip>
        </div>
      </nav>
    </>
  );
};

export default SidebarMenu;
