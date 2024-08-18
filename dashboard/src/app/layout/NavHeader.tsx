"use client";
import { getAuthKey } from "@/helpers/config/envConfig";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { baseApi } from "@/redux/api/baseApi";
import { Avatar, Menu, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const NavHeader = () => {
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
      <div className="flex justify-between items-start px-5 w-full">
        <div className="py-4">Welcome back, Edward 👋</div>
        <div className="py-3 pr-5">
          <Menu trigger="click" position="bottom-end" width={150} shadow="md">
            <Menu.Target>
              <UnstyledButton>
                <Avatar color="cyan" radius="xl">
                  MK
                </Avatar>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="a" href="https://mantine.dev">
                Profile
              </Menu.Item>
              <Menu.Item component="button" onClick={logOut}>
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* <Popover.Target>
            <Avatar color="cyan" radius="xl">
              MK
            </Avatar>
            <Popover.Dropdown>
              Change position and offset to configure dropdown offset relative
              to target
            </Popover.Dropdown>
          </Popover.Target> */}
        </div>
      </div>
    </>
  );
};

export default NavHeader;
