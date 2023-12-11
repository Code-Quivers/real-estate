"use client";

import { Container, Sidebar, Sidenav, Content, Navbar, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import { useState } from "react";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";
import Link from "next/link";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 156,
  background: "#29429f",
  color: " #fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const RootLayout = ({ children }) => {
  const [expand, setExpand] = useState(true);
  return (
    <div className="show-fake-browser sidebar-page ">
      <Container>
        <Sidebar
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div className="bg-[#29429f] flex flex-col  justify-center items-center py-16">
              <Image
                src={profileLogo}
                alt="Profile Picture"
                className=" object-center object-cover h-[120px] w-[120px]"
              />
              <h2 className="text-white">Shafinur Islam</h2>
            </div>
          </Sidenav.Header>
          <Sidenav
            expanded={expand}
            defaultOpenKeys={["3"]}
            appearance="inverse"
          >
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
                    as={Link}
                    href="/tenant/available-units"
                    eventKey="2"
                    active
                    style={{
                      backgroundColor: "#29429f",
                    }}
                    icon={<GroupIcon />}
                  >
                    Available Units
                  </Nav.Item>
                  <Nav.Item
                    style={{ backgroundColor: "#29429f" }}
                    eventKey="3"
                    icon={<GroupIcon />}
                  >
                    Saved Units
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
                    Request
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container>
          <Content className="m-3">{children}</Content>
        </Container>
      </Container>
    </div>
  );
};

export default RootLayout;
