"use client";
import { useState } from "react";
import { Drawer, IconButton, Nav, Sidenav } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { fileUrlKey, getAuthKey } from "@/configs/envConfig";
import GroupIcon from "@rsuite/icons/legacy/Group";
import DashboardIcon from "@rsuite/icons/Dashboard";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { PiArrowLeftBold } from "react-icons/pi";
import Image from "next/image";
const PropertyOwnerDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const activeLink = usePathname();
  const router = useRouter();

  const { data: dataResponse, isError, isLoading, error } = useGetPropertyOwnerMyProfileQuery();

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

                  <Nav appearance="subtle" className="divide-y-2 border-t-2 border-black divide-black">
                    <Nav.Item
                      as={Link}
                      href="/property-owner"
                      eventKey="1"
                      icon={<DashboardIcon />}
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner" && "!bg-[#17318f]"}`}
                      style={{
                        backgroundColor: "#29429f",
                        borderTop: "2px solid #000 !important",
                      }}
                    >
                      Account Information
                    </Nav.Item>
                    <Nav.Item
                      eventKey="2"
                      as={Link}
                      href="/property-owner/available-tenants"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/available-tenants" && "!bg-[#17318f]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      icon={<GroupIcon />}
                    >
                      Available Tenants
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/saved-tenants"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/saved-tenants" && "!bg-[#17318f]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="3"
                      icon={<GroupIcon />}
                    >
                      Saved Tenants
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/unit-information"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/unit-information" && "!bg-[#17318f]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="4"
                      icon={<GroupIcon />}
                    >
                      Unit Information
                    </Nav.Item>
                    <Nav.Item style={{ backgroundColor: "#29429f" }} eventKey="5" className="hover:!bg-[#1b3697]" icon={<GroupIcon />}>
                      Documents
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/messages"
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="6"
                      className="hover:!bg-[#1b3697]"
                      icon={<GroupIcon />}
                    >
                      Messages
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/service-providers"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/service-providers" && "!bg-[#17318f]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="7"
                      icon={<GroupIcon />}
                    >
                      Service Providers
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/saved-service-providers"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/saved-service-providers" && "!bg-[#17318f]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="8"
                      icon={<GroupIcon />}
                    >
                      Saved Service Providers
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/reports"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/reports" && "!bg-[#17318f]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="9"
                      icon={<GroupIcon />}
                    >
                      Reports
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/settings"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/settings" && "!bg-[#17318f]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="9"
                      icon={<GroupIcon />}
                    >
                      Settings
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/maintenance-requests"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/maintenance-requests" && "!bg-[#17318f]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="9"
                      icon={<GroupIcon />}
                    >
                      Maintenance Request
                    </Nav.Item>
                    <Nav.Item
                      onClick={logOut}
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/maintenance-requests" && "!bg-[#17318f]"}`}
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

export default PropertyOwnerDrawer;
