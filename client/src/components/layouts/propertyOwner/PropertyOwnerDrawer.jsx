"use client";
import { useState } from "react";
import { Drawer, IconButton, Nav, Sidenav } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { fileUrlKey, getAuthKey } from "@/configs/envConfig";
import { Icon } from "@rsuite/icons";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { PiArrowLeftBold } from "react-icons/pi";
import Image from "next/image";

import { BsBuildingsFill } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoDocumentText, IoSettings } from "react-icons/io5";
import { BiSolidMessageSquareDetail, BiSolidReport } from "react-icons/bi";
import { MdCleanHands } from "react-icons/md";
import { GrHostMaintenance } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
// import { useDispatch } from "react-redux";

const PropertyOwnerDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const activeLink = usePathname();
  const router = useRouter();

  const { data: dataResponse } = useGetPropertyOwnerMyProfileQuery();

  const { data: myProfileData } = dataResponse || {};

  // Clear all caches
  // const dispatch = useDispatch();

  const logOut = async () => {
    router.push("/");
    removeUserInfo(getAuthKey());
    // dispatch(baseApi.util.resetApiState());
  };
  const design = {
    fontSize: "25px",
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
          <Drawer.Body className="!z-50 !bg-[#29429f] !p-0 !pb-3">
            <div className=" ">
              <Sidenav expanded={true} appearance="inverse" className="!bg-[#29429f]">
                <Sidenav.Body>
                  <div className="bg-[#29429f] p-3">
                    <div className="flex justify-between  items-center">
                      <h3 className="text-white text-2xl font-semibold">Menu</h3>
                      <button onClick={() => setOpen(false)}>
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
                      href="/property-owner"
                      eventKey="1"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                        borderTop: "2px solid #000",
                      }}
                      icon={<Icon style={design} as={FaUserLarge} />}
                    >
                      Account Information
                    </Nav.Item>
                    <Nav.Item
                      eventKey="2"
                      as={Link}
                      href="/property-owner/available-tenants"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/available-tenants" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      icon={<Icon style={design} as={FaUsers} />}
                    >
                      Available Tenants
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/saved-tenants"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/saved-tenants" && "!bg-[#1b3697]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="3"
                      icon={<Icon style={design} as={FaUsersCog} />}
                    >
                      Saved Tenants
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/unit-information"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/unit-information" && "!bg-[#1b3697]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="4"
                      icon={<Icon style={design} as={BsBuildingsFill} />}
                    >
                      Unit Information
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/documents"
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="5"
                      className="hover:!bg-[#1b3697]"
                      icon={<Icon style={design} as={IoDocumentText} />}
                    >
                      Documents
                    </Nav.Item>
                    {/* messages */}
                    <Nav.Item
                      as={Link}
                      href="/property-owner/messages"
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="6"
                      className={`hover:!bg-[#1b3697] ${activeLink.startsWith("/property-owner/messages") && "!bg-[#1b3697]"}`}
                      icon={<Icon style={design} as={BiSolidMessageSquareDetail} />}
                    >
                      Messages
                    </Nav.Item>
                    {/* Service Provider */}
                    <Nav.Item
                      as={Link}
                      href="/property-owner/service-providers"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/service-providers" && "!bg-[#1b3697]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="7"
                      icon={<Icon style={design} as={MdCleanHands} />}
                    >
                      Service Providers
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/saved-service-providers"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/saved-service-providers" && "!bg-[#1b3697]"}`}
                      style={{ backgroundColor: "#29429f" }}
                      eventKey="8"
                      icon={<Icon style={design} as={MdCleanHands} />}
                    >
                      Saved Service Providers
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/payment"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/payment" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="9"
                      icon={<Icon style={design} as={BiSolidReport} />}
                    >
                      Payment
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/reports"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/reports" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="10"
                      icon={<Icon style={design} as={BiSolidReport} />}
                    >
                      Reports
                    </Nav.Item>
                    <Nav.Item
                      as={Link}
                      href="/property-owner/maintenance-requests"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/maintenance-requests" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="11"
                      icon={<Icon style={design} as={GrHostMaintenance} />}
                    >
                      Maintenance Request
                    </Nav.Item>{" "}
                    <Nav.Item
                      as={Link}
                      href="/property-owner/settings"
                      className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/settings" && "!bg-[#1b3697]"}`}
                      style={{
                        backgroundColor: "#29429f",
                      }}
                      eventKey="12"
                      icon={<Icon style={design} as={IoSettings} />}
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
                      eventKey="13"
                      icon={<Icon style={design} as={TbLogout2} />}
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
