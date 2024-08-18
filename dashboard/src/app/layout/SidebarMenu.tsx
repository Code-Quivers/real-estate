import Link from "next/link";
import Tenants from "../assets/icons/Tenants";
import { ActionIcon, Avatar, Tooltip } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

const SidebarMenu = () => {
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
              <IconLogout size={24}  />
            </ActionIcon>
          </Tooltip>
        </div>
      </nav>
    </>
  );
};

export default SidebarMenu;
