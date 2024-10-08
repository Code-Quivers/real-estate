"use client";
import Link from "next/link";
import { ActionIcon, Avatar, NavLink, Tooltip } from "@mantine/core";
import {
  IconBrandCashapp,
  IconBuildingEstate,
  IconBuildingFortress,
  IconCashBanknote,
  IconLogout,
  IconUsers,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { getUserInfo, removeUserInfo } from "@/hooks/services/auth.service";
import { getAuthKey } from "@/helpers/config/envConfig";
import { baseApi } from "@/redux/api/baseApi";

const SidebarMenu = ({ toggleMobile }: any) => {
  const router = useRouter();
  const path = usePathname();
  // console.log(path, "path");
  const userInfo: any = getUserInfo();
  console.log(userInfo);
  // Clear all caches
  const dispatch = useDispatch();

  const logOut = async () => {
    router.push("/login");
    removeUserInfo(getAuthKey());
    dispatch(baseApi.util.resetApiState());
  };
  return (
    <>
      <Link href={"/"} className="p-4 font-bold text-lg text-indigo-500">
        Manage Rental Unit
      </Link>
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
          <NavLink
            onClick={toggleMobile}
            component={Link}
            key="Tenant"
            href="/connected-accounts"
            active={path === "/connected-accounts"}
            label="Connected accounts"
            leftSection={<IconCashBanknote size={18} />}
            variant="filled"
            color="indigo"
          />
        </div>
        <div className="grid grid-cols-5 items-center justify-around mb-10  gap-2  bg-[#adadad15] mx-1 pb-3 pt-2 rounded-lg">
          <div className="col-span-4 pl-1 ">
            <p className="text-[13px] font-medium overflow-hidden  text-ellipsis whitespace-nowrap">
              @{userInfo?.userName}
            </p>
            <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">
              {userInfo?.email as any}
            </p>
          </div>
          <div className="col-span-1">
            <Tooltip label="Logout" position="top">
              <ActionIcon variant="subtle" size="lg">
                <IconLogout onClick={logOut} size={24} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SidebarMenu;
