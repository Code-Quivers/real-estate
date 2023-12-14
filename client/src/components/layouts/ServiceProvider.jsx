"use client";

import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import Image from "next/image";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ServiceProviderSidebar = () => {
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
              className=" object-center select-none h-[150px] w-[150px]"
            />
            <h2 className="text-white ">Company Name</h2>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav appearance="subtle" className="divide-y-2 divide-black">
            <Nav.Item
              as={Link}
              href="/service-provider"
              eventKey="1"
              icon={<DashboardIcon />}
              className={`hover:!bg-[#1b3697] ${
                activeLink === "/service-provider" && "!bg-[#1b3697]"
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
              href="/service-providers/messages"
              className={`hover:!bg-[#1b3697] ${
                activeLink === "/service-providers/messages" && "!bg-[#1b3697]"
              }`}
              style={{
                backgroundColor: "#29429f",
              }}
              icon={<GroupIcon />}
            >
              Messages
            </Nav.Item>
            <Nav.Item
              as={Link}
              href="/service-providers/pending-orders"
              className={`hover:!bg-[#1b3697] ${
                activeLink === "/service-providers/pending-orders" &&
                "!bg-[#1b3697]"
              }`}
              style={{
                backgroundColor: "#29429f",
                borderBottom: "2px solid #000",
              }}
              eventKey="3"
              icon={<GroupIcon />}
            >
              Pending Orders
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default ServiceProviderSidebar;
