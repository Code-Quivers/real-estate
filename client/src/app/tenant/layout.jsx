"use client";

import { Container, Sidebar, Sidenav, Content, Navbar, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import { useState } from "react";

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
            <div style={headerStyles}>
              <span style={{ marginLeft: 12 }}> BRAND</span>
            </div>
          </Sidenav.Header>
          <Sidenav
            expanded={expand}
            defaultOpenKeys={["3"]}
            appearance="inverse"
          >
            <Sidenav.Body>
              <Nav appearance="tabs">
                <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" active icon={<GroupIcon />}>
                  User Group
                </Nav.Item>
                <Nav.Item eventKey="3" icon={<GroupIcon />}>
                  User Group
                </Nav.Item>
                <Nav.Item eventKey="4" icon={<GroupIcon />}>
                  User Group
                </Nav.Item>
                <Nav.Item eventKey="5" icon={<GroupIcon />}>
                  User Group
                </Nav.Item>
                <Nav.Item eventKey="6" icon={<GroupIcon />}>
                  User Group
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
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
