"use client";
import Link from "next/link";
import { ActionIcon, Avatar, NavLink, Tooltip } from "@mantine/core";
import {
  IconBuildingEstate,
  IconBuildingFortress,
  IconLogout,
  IconUsers,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { getAuthKey } from "@/helpers/config/envConfig";
import { baseApi } from "@/redux/api/baseApi";

const SidebarMenu = ({ toggleMobile }: any) => {
  const router = useRouter();
  const path = usePathname();
  // console.log(path, "path");

  // Clear all caches
  const dispatch = useDispatch();

  const logOut = async () => {
    router.push("/login");
    removeUserInfo(getAuthKey());
    dispatch(baseApi.util.resetApiState());
  };
  return (
    <>
      <h1 className="p-4 font-bold text-lg text-indigo-500">
        Manage Rental Unit
      </h1>
      <nav className="mt-12 flex flex-col h-full justify-between">
        <div className="flex flex-col">
          <NavLink
            onClick={toggleMobile}
            styles={{ label: { fontSize: "1rem" } }}
            component={Link}
            key="Tenant"
            href="/tenants"
            active={path === "/tenants"}
            label="Tenant"
            leftSection={<IconUsers size={18} />}
            variant="filled"
            color="indigo"
          />
          <NavLink
            onClick={toggleMobile}
            component={Link}
            key="Tenant"
            href="/property-owner"
            active={path === "/property-owner"}
            label="Property Owner"
            leftSection={<IconBuildingEstate size={18} />}
            variant="filled"
            color="indigo"
          />
          <NavLink
            onClick={toggleMobile}
            component={Link}
            key="Tenant"
            href="/properties"
            active={path === "/properties"}
            label="Properties"
            leftSection={<IconBuildingFortress size={18} />}
            variant="filled"
            color="indigo"
          />

          {/* <Link
            href="/tenants"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Tenant
          </Link> */}
          {/* <Link
            href="/property-owner"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Property Owner
          </Link> */}
          {/* <Link
            href="/properties"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Properties
          </Link> */}
        </div>
        <div className="flex items-center justify-around mb-10 px-3 gap-2 border-t pt-2">
          <Avatar color="cyan" radius="xl">
            MK
          </Avatar>
          <div className="text-sm">
            {/* <p className="line-clamp-1">Muhammad Kudrat</p> */}
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
