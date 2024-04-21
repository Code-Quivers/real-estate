"use client";

import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import Image from "next/image";
import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { removeUserInfo } from "@/hooks/services/auth.service";
import { fileUrlKey, getAuthKey } from "@/configs/envConfig";
import { useGetServiceProviderMyProfileQuery } from "@/redux/features/serviceProvider/serviceProviderApi";
import MessageIcon from "@rsuite/icons/Message";
import SettingHorizontalIcon from "@rsuite/icons/SettingHorizontal";
import TaskIcon from "@rsuite/icons/Task";

const ServiceProviderSidebar = () => {
  const activeLink = usePathname();
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetServiceProviderMyProfileQuery(null);
  const { data: myProfileData } = data || {};

  const logOut = () => {
    removeUserInfo(getAuthKey());
    router.push("/");
  };
  return (
    <div className="!h-screen shadow-md !sticky top-0 overflow-y-auto">
      <Sidenav expanded={true} className="h-screen !bg-[#29429f]" appearance="inverse">
        <Sidenav.Header>
          <div className="bg-[#29429f] flex flex-col py-5  justify-center items-center">
            <Image
              width={200}
              height={200}
              src={myProfileData?.profileImage ? ` ${fileUrlKey()}/${myProfileData?.profileImage}` : profileLogo}
              className="max-md:w-[70px] max-md:h-[70px] rounded-full md:w-[130px] md:h-[130px] object-cover  select-none"
              alt="Profile Image"
            />
            <h2 className="mt-5 text-white ">{myProfileData?.companyName ?? "--"}</h2>
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav appearance="subtle" className="divide-y-2 divide-black">
            <Nav.Item
              as={Link}
              href="/service-provider"
              eventKey="1"
              icon={<DashboardIcon />}
              className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider" && "!bg-[#1b3697]"}`}
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
              href="/service-provider/messages"
              className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider/messages" && "!bg-[#1b3697]"}`}
              style={{
                backgroundColor: "#29429f",
              }}
              icon={<MessageIcon />}
            >
              Messages
            </Nav.Item>
            <Nav.Item
              as={Link}
              href="/service-provider/my-orders"
              className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider/my-orders" && "!bg-[#1b3697]"}`}
              style={{
                backgroundColor: "#29429f",
              }}
              eventKey="3"
              icon={<TaskIcon />}
            >
              My Orders
            </Nav.Item>{" "}
            <Nav.Item
              as={Link}
              href="/service-provider/pending-orders"
              className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider/pending-orders" && "!bg-[#1b3697]"}`}
              style={{
                backgroundColor: "#29429f",
              }}
              eventKey="3"
              icon={<TaskIcon />}
            >
              Pending Orders
            </Nav.Item>{" "}
            <Nav.Item
              as={Link}
              href="/service-provider/settings"
              className={`hover:!bg-[#1b3697] ${activeLink === "/service-provider/settings" && "!bg-[#1b3697]"}`}
              style={{
                backgroundColor: "#29429f",
              }}
              eventKey="9"
              icon={<SettingHorizontalIcon />}
            >
              Settings
            </Nav.Item>
            <Nav.Item
              onClick={logOut}
              className={`hover:!bg-[#1b3697] `}
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

export default ServiceProviderSidebar;
