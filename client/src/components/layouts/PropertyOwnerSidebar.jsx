"use client";

import { Sidenav, Nav, useToaster, Message } from "rsuite";
import Image from "next/image";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { fileUrlKey, getAuthKey } from "@/configs/envConfig";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import { useEffect } from "react";
import { Icon } from "@rsuite/icons";
import { BsBuildingsFill } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoDocumentText, IoSettings } from "react-icons/io5";
import { BiSolidMessageSquareDetail, BiSolidReport } from "react-icons/bi";
import { MdCleanHands } from "react-icons/md";
import { GrHostMaintenance } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";

const PropertyOwnerSidebar = () => {
  const activeLink = usePathname();
  const router = useRouter();

  const { data: dataResponse, isError, isLoading, isSuccess, error } = useGetPropertyOwnerMyProfileQuery();

  const { data: myProfileData } = dataResponse || {};

  // console.log(data);

  const logOut = () => {
    removeUserInfo(getAuthKey());
    router.push("/");
  };
  const toaster = useToaster();

  useEffect(() => {
    if (!isLoading && isError && !isSuccess) {
      toaster.push(
        <Message centered showIcon type="error" closable>
          {error?.message || "Something went wrong. Please Login Again"}
        </Message>,
        {
          placement: "topEnd",
          duration: 3000,
        },
      );
    }
  }, [isLoading, isError, isSuccess, error, toaster]);
  const design = {
    fontSize: "25px",
  };
  return (
    <div className="h-screen shadow-md sticky top-0 overflow-y-auto custom-scrollbar">
      <Sidenav expanded={true} className="h-screen !bg-[#29429f]" appearance="inverse">
        <Sidenav.Header>
          <div className="bg-[#29429f] flex flex-col py-5  justify-center items-center">
            <Image
              width={120}
              height={120}
              src={myProfileData?.profileImage ? `${fileUrlKey()}/${myProfileData?.profileImage}` : profileLogo}
              className="w-[120px] h-[120px] object-cover rounded-full select-none"
              alt="Profile Image"
            />
            <h2 className="text-white mt-3 ">
              {myProfileData?.firstName ?? "--"} {myProfileData?.lastName ?? "--"}
            </h2>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav appearance="subtle" className="divide-y-2 divide-black">
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
              href="/property-owner/reports"
              className={`hover:!bg-[#1b3697] ${activeLink === "/property-owner/reports" && "!bg-[#1b3697]"}`}
              style={{
                backgroundColor: "#29429f",
              }}
              eventKey="9"
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
              eventKey="9"
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
              eventKey="9"
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
              eventKey="9"
              icon={<Icon style={design} as={TbLogout2} />}
            >
              Log Out
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default PropertyOwnerSidebar;
