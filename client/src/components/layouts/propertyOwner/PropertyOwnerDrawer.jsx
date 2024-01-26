"use client";
import { useState } from "react";
import { Drawer, IconButton, Nav, Sidenav } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { fileUrlKey, getAuthKey } from "@/configs/envConfig";
import Image from "next/image";
import GroupIcon from "@rsuite/icons/legacy/Group";
import DashboardIcon from "@rsuite/icons/Dashboard";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const PropertyOwnerDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const activeLink = usePathname();
  const router = useRouter();

  const {
    data: dataResponse,
    isError,
    isLoading,
    error,
  } = useGetPropertyOwnerMyProfileQuery();

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
          <IconButton
            circle
            icon={<GiHamburgerMenu size={30} />}
            size="xs"
            onClick={() => handleOpen()}
          />
        </div>
        <div>
          <p className="font-semibold">
            {myProfileData?.firstName} {myProfileData?.lastName}
          </p>
        </div>
      </div>
      <div className="border-4 border-black">
        <Drawer
          size="xs"
          placement="left"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Drawer.Header style={{ backgroundColor: "#29429f" }}>
            <Drawer.Title className="!text-white">
              <span className="text-white text-xl font-semibold">Menu</span>
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body style={{ padding: 0, backgroundColor: "#29429f" }}>
            <div className=" ">
              <Sidenav expanded={true} appearance="inverse">
                <Sidenav.Body>
                  <Nav appearance="subtle" className="divide-y-2 divide-black">
                    <Nav.Item
                      as={Link}
                      href="/property-owner"
                      eventKey="1"
                      icon={<DashboardIcon />}
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner" && "!bg-[#1b3697]"
                      }`}
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
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner/available-tenants" &&
                        "!bg-[#1b3697]"
                      }`}
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
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner/saved-tenants" &&
                        "!bg-[#1b3697]"
                      }`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="3"
                      icon={<GroupIcon />}
                    >
                      Saved Tenants
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/unit-information"
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner/unit-information" &&
                        "!bg-[#1b3697]"
                      }`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="4"
                      icon={<GroupIcon />}
                    >
                      Unit Information
                    </Nav.Item>
                    <Nav.Item
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="5"
                      className="hover:!bg-[#1b3697]"
                      icon={<GroupIcon />}
                    >
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
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner/service-providers" &&
                        "!bg-[#1b3697]"
                      }`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="7"
                      icon={<GroupIcon />}
                    >
                      Service Providers
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/saved-service-providers"
                      className={`hover:!bg-[#1b3697] ${
                        activeLink ===
                          "/property-owner/saved-service-providers" &&
                        "!bg-[#1b3697]"
                      }`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="8"
                      icon={<GroupIcon />}
                    >
                      Saved Service Providers
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/reports"
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner/reports" &&
                        "!bg-[#1b3697]"
                      }`}
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
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner/settings" &&
                        "!bg-[#1b3697]"
                      }`}
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
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner/maintenance-requests" &&
                        "!bg-[#1b3697]"
                      }`}
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
                      className={`hover:!bg-[#1b3697] ${
                        activeLink === "/property-owner/maintenance-requests" &&
                        "!bg-[#1b3697]"
                      }`}
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
