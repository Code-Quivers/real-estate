"use client";
import { useState } from "react";
import { Drawer, IconButton, Nav, Sidenav } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { fileUrlKey, getAuthKey } from "@/configs/envConfig";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { PiArrowLeftBold } from "react-icons/pi";
import Image from "next/image";
import { useGetServiceProviderMyProfileQuery } from "@/redux/features/serviceProvider/serviceProviderApi";
import { Icon } from "@rsuite/icons";
import { FaUserLarge } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import TaskIcon from "@rsuite/icons/Task";
import { useDispatch } from "react-redux";
import { baseApi } from "@/redux/api/baseApi";

const ServiceProviderSidebarDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const activeLink = usePathname();
  const router = useRouter();

  const { data: dataResponse } = useGetServiceProviderMyProfileQuery();

  const { data: myProfileData } = dataResponse || {};

  // Clear all caches
  const dispatch = useDispatch();

  const logOut = async () => {
    router.push("/");
    removeUserInfo(getAuthKey());
    dispatch(baseApi.util.resetApiState());
  };
  return (
    <div>
      <div className="border-b py-1 shadow-lg flex justify-between items-center pr-3">
        <div>
          <IconButton circle icon={<GiHamburgerMenu size={30} />} size="xs" onClick={() => handleOpen()} />
        </div>
        <div>
          <p className="font-semibold">
            {myProfileData?.firstName} {myProfileData?.lastName}
          </p>
        </div>
      </div>
      <div>
        <Drawer overflow={false} placement="left" open={open} onClose={() => setOpen(false)} closeButton={false} dialogAs="div" className="max-w-xs">
          {/* <Drawer.Header style={{ backgroundColor: "#29429f" }}>
            <Drawer.Title className="!text-white">
              <span className="text-white text-xl font-semibold">Menu</span>
            </Drawer.Title>
          </Drawer.Header> */}
          <Drawer.Body className="!z-50 !bg-[#29429f] !p-0 !pb-3">
            <div className=" ">
              <Sidenav expanded={true} appearance="inverse" className="!bg-[#29429f]">
                <Sidenav.Body>
                  <div
                    className="
                    bg-[#29429f] p-5
                  
                  "
                  >
                    <div className="flex justify-between  items-center">
                      <h3 className="text-white text-2xl font-semibold">Menu</h3>
                      <button
                        onClick={() => setOpen(false)}
                        // border-transparent hover:
                      >
                        <PiArrowLeftBold size={25} />
                      </button>
                    </div>
                    {/* profile details */}
                    <div>
                      <div className="bg-[#29429f] flex flex-col   justify-center items-center">
                        <Image
                          width={100}
                          height={100}
                          src={myProfileData?.profileImage ? `${fileUrlKey()}/${myProfileData?.profileImage}` : profileLogo}
                          className="w-[100px] h-[100px] object-cover rounded-full select-none"
                          alt="Profile Image"
                        />
                        <h2 className="text-white mt-3 ">
                          {myProfileData?.firstName ?? "--"} {myProfileData?.lastName ?? "--"}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <Nav appearance="subtle" onClick={() => setOpen(false)} className="divide-y-2 divide-black">
                    <Nav.Item
                      as={Link}
                      href="/service-provider"
                      eventKey="1"
                      icon={<Icon as={FaUserLarge} />}
                      className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                        borderTop: "2px solid #000",
                      }}
                    >
                      Account Information
                    </Nav.Item>
                    <Nav.Item
                      eventKey="2"
                      as={Link}
                      href="/service-provider/messages"
                      className={`hover:!bg-[#1b3697] ${activeLink.startsWith("/service-provider/messages") && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      icon={<Icon as={BiSolidMessageSquareDetail} />}
                    >
                      Messages
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/service-provider/my-orders"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider/my-orders" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="3"
                      icon={<TaskIcon />}
                    >
                      My Orders
                    </Nav.Item>{" "}
                    <Nav.Item
                      as={Link}
                      href="/service-provider/pending-orders"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider/pending-orders" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="3"
                      icon={<TaskIcon />}
                    >
                      Pending Orders
                    </Nav.Item>{" "}
                    <Nav.Item
                      as={Link}
                      href="/service-provider/settings"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider/settings" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="9"
                      icon={<Icon as={IoSettings} />}
                    >
                      Settings
                    </Nav.Item>
                    <Nav.Item
                      onClick={logOut}
                      className={`hover:!bg-[#1b3697] `}
                      style={{
                        backgroundColor: "#29429f",
                        borderBottom: "2px solid #000",
                      }}
                      eventKey="9"
                      icon={<Icon as={FaSignOutAlt} />}
                    >
                      Log Out
                    </Nav.Item>
                  </Nav>
                </Sidenav.Body>
              </Sidenav>
            </div>
          </Drawer.Body>
        </Drawer>
      </div>
    </div>
  );
};

export default ServiceProviderSidebarDrawer;
