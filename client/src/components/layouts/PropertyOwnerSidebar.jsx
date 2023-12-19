"use client";

import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import Image from "next/image";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PropertyOwnerSidebar = () => {
  const activeLink = usePathname();

  return (
    <div className="h-screen shadow-md sticky top-0 overflow-y-auto">
      <Sidenav
        expanded={true}
        className="h-screen !bg-[#29429f]"
        appearance="inverse"
      >
        <Sidenav.Header>
          <div className="bg-[#29429f] flex flex-col py-5  justify-center items-center">
            <Image
              src={profileLogo}
              alt="Profile Picture"
              className=" object-center select-none h-[120px] w-[120px]"
            />
            <h2 className="text-white ">Shafinur Islam</h2>
          </div>
        </Sidenav.Header>
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
                borderTop: "2px solid #000",
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
                activeLink === "/property-owner/saved-service-providers" &&
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
              href="/property-owner/maintenance-requests"
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
              Maintenance Request
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default PropertyOwnerSidebar;
