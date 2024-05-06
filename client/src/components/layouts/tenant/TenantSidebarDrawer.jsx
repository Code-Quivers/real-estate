"use client";
import { useState } from "react";
import { Drawer, IconButton, Nav, Sidenav } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { fileUrlKey, getAuthKey } from "@/configs/envConfig";
import GroupIcon from "@rsuite/icons/legacy/Group";
import DashboardIcon from "@rsuite/icons/Dashboard";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { PiArrowLeftBold } from "react-icons/pi";
import Image from "next/image";
import { useGetTenantMyProfileQuery } from "@/redux/features/tenant/tenantsApi";

const TenantSidebarDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const activeLink = usePathname();
  const router = useRouter();

  const { data: dataResponse } = useGetTenantMyProfileQuery();

  const { data: myProfileData } = dataResponse || {};

  // console.log(data);

  const logOut = () => {
    removeUserInfo(getAuthKey());
    router.push("/");
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
        <Drawer placement="left" open={open} onClose={() => setOpen(false)} closeButton={false} dialogAs="div" className="max-w-xs">
          {/* <Drawer.Header style={{ backgroundColor: "#29429f" }}>
            <Drawer.Title className="!text-white">
              <span className="text-white text-xl font-semibold">Menu</span>
            </Drawer.Title>
          </Drawer.Header> */}
          <Drawer.Body style={{ padding: 0, backgroundColor: "#29429f" }}>
            <div className=" ">
              <Sidenav expanded={true} appearance="inverse">
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

                  <Nav appearance="subtle" className="divide-y-2 divide-black">
                    <Nav.Item
                      as={Link}
                      href="/tenant"
                      eventKey="1"
                      icon={<DashboardIcon />}
                      className={`hover:!bg-[#1b3697] ${activeLink === "/tenant" && "!bg-[#1b3697]"}`}
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
                      href="/tenant/available-units"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/tenant/available-units" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      icon={<GroupIcon />}
                    >
                      Available Units
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/tenant/saved-units"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/tenant/saved-units" && "!bg-[#1b3697]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="3"
                      icon={<GroupIcon />}
                    >
                      Saved Units
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/tenant/unit-information"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/tenant/unit-information" && "!bg-[#1b3697]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="4"
                      icon={<GroupIcon />}
                    >
                      Unit Information
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/tenant/documents"
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="5"
                      className="hover:!bg-[#1b3697]"
                      icon={<GroupIcon />}
                    >
                      Documents
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/tenant/messages"
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="6"
                      className="hover:!bg-[#1b3697]"
                      icon={<GroupIcon />}
                    >
                      Messages
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/tenant/unit-information/my-requests"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/tenant/unit-information/my-requests" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="7"
                      icon={<GroupIcon />}
                    >
                      Requests
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/tenant/settings"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/tenant/settings" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="7"
                      icon={<GroupIcon />}
                    >
                      Settings
                    </Nav.Item>
                    <Nav.Item
                      onClick={logOut}
                      className={`hover:!bg-[#1b3697]`}
                      style={{
                        backgroundColor: "#29429f",
                        borderBottom: "2px solid #000",
                      }}
                      eventKey="9"
                      icon={<GroupIcon />}
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

export default TenantSidebarDrawer;