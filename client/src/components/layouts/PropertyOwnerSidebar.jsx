"use client";

import { Container, Sidebar, Sidenav, Nav } from "rsuite";

import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";

import Image from "next/image";
import profileLogo from "@/assets/propertyOwner/profilePic.png";

const PropertyOwnerSidebar = () => {
  return (
    <div className="show-fake-browser relative    sidebar-page ">
      <Container className="sticky top-0  ">
        <Sidebar
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          width={260}
          collapsible
        >
          <Sidenav.Header>
            <div className="bg-[#29429f] flex flex-col py-5  justify-center items-center">
              <Image
                src={profileLogo}
                alt="Profile Picture"
                className=" object-center h-[120px] w-[120px]"
              />
              <h2 className="text-white">Shafinur Islam</h2>
            </div>
          </Sidenav.Header>
          <Sidenav expanded defaultOpenKeys={["3"]} appearance="inverse">
            <Sidenav.Body>
              <Nav appearance="subtle" className="divide-y-2 divide-black">
                <Nav.Item
                  eventKey="1"
                  icon={<DashboardIcon />}
                  style={{
                    backgroundColor: "#29429f",
                    borderTop: "2px solid #000",
                  }}
                >
                  Account Information
                </Nav.Item>
                <Nav.Item
                  eventKey="2"
                  active
                  style={{
                    backgroundColor: "#29429f",
                  }}
                  icon={<GroupIcon />}
                >
                  Available Tenants
                </Nav.Item>
                <Nav.Item
                  style={{ backgroundColor: "#29429f" }}
                  eventKey="3"
                  icon={<GroupIcon />}
                >
                  Saved Tenants
                </Nav.Item>
                <Nav.Item
                  style={{ backgroundColor: "#29429f" }}
                  eventKey="4"
                  icon={<GroupIcon />}
                >
                  Unit Information
                </Nav.Item>
                <Nav.Item
                  style={{ backgroundColor: "#29429f" }}
                  eventKey="5"
                  icon={<GroupIcon />}
                >
                  Documents
                </Nav.Item>
                <Nav.Item
                  style={{ backgroundColor: "#29429f" }}
                  eventKey="6"
                  icon={<GroupIcon />}
                >
                  Messages
                </Nav.Item>
                <Nav.Item
                  style={{ backgroundColor: "#29429f" }}
                  eventKey="7"
                  icon={<GroupIcon />}
                >
                  Service Providers
                </Nav.Item>
                <Nav.Item
                  style={{ backgroundColor: "#29429f" }}
                  eventKey="8"
                  icon={<GroupIcon />}
                >
                  Saved Service Providers
                </Nav.Item>
                <Nav.Item
                  style={{ backgroundColor: "#29429f" }}
                  eventKey="9"
                  icon={<GroupIcon />}
                >
                  Maintenance Request
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>
      </Container>
    </div>
  );
};

export default PropertyOwnerSidebar;
