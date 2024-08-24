"use client";

import Link from "next/link";
import Tenants from "../assets/icons/Tenants";
import { ActionIcon, Avatar, NavLink, Tooltip } from "@mantine/core";
import {
  IconBuildingEstate,
  IconBuildingFortress,
  IconLogout,
  IconUserFilled,
  IconUsers,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { getAuthKey } from "@/helpers/config/envConfig";
import { baseApi } from "@/redux/api/baseApi";
import { useState } from "react";

const SidebarMenu = () => {
  const router = useRouter();
  const [active, setActive] = useState("");

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
          <NavLink
            styles={{ label: { fontSize: "1rem" } }}
            component={Link}
            key="Tenant"
            href="/tenants"
            active={active === "Tenant"}
            label="Tenant"
            leftSection={<IconUsers size={18} />}
            variant="filled"
            color="cyan"
            onClick={() => setActive("Tenant")}
          />
          <NavLink
            component={Link}
            key="Tenant"
            href="/property-owner"
            active={active === "propertyOwner"}
            label="Property Owner"
            leftSection={<IconBuildingEstate size={18} />}
            variant="filled"
            color="cyan"
            onClick={() => setActive("propertyOwner")}
          />
          <NavLink
            component={Link}
            key="Tenant"
            href="/properties"
            active={active === "properties"}
            label="Properties"
            leftSection={<IconBuildingFortress size={18} />}
            variant="filled"
            color="cyan"
            onClick={() => setActive("properties")}
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
