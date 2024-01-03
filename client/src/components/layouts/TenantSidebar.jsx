"use client";

import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import Image from "next/image";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { getAuthKey } from "@/configs/envConfig";

const TenantSidebar = () => {
  const activeLink = usePathname();
  const router = useRouter();
  const logOut = () => {
    removeUserInfo(getAuthKey());
    router.push("/");
  };
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
              href="/tenant"
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
              href="/tenant/available-units"
              className={`hover:!bg-[#1b3697] ${
                activeLink === "/tenant/available-units" && "!bg-[#1b3697]"
              }`}
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
              className={`hover:!bg-[#1b3697] ${
                activeLink === "/tenant/saved-units" && "!bg-[#1b3697]"
              }`}
              style={{ backgroundColor: "#29429f" }}
              eventKey="3"
              icon={<GroupIcon />}
            >
              Saved Units
            </Nav.Item>
            <Nav.Item
              as={Link}
              href="/tenant/unit-information"
              className={`hover:!bg-[#1b3697] ${
                activeLink === "/tenant/unit-information" && "!bg-[#1b3697]"
              }`}
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
              href="/tenant/requests"
              className={`hover:!bg-[#1b3697] ${
                activeLink === "/tenant/requests" && "!bg-[#1b3697]"
              }`}
              style={{
                backgroundColor: "#29429f",
              }}
              eventKey="7"
              icon={<GroupIcon />}
            >
              Requests
            </Nav.Item>{" "}
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
  );
};

export default TenantSidebar;

{
  /* <div className="show-fake-browser sidebar-page ">
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
    </div> */
}
