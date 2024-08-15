import Link from "next/link";
import Tenants from "../assets/icons/Tenants";

const SidebarMenu = () => {
  return (
    <>
      <nav>
        <div className="mt-10 flex flex-col">
          <Link
            href="/tenants"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Tenant
          </Link>
          <Link
            href="/property-owner"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Property Owner
          </Link>
          <Link
            href="/properties"
            className="py-3 hover:bg-[#E6F4FF] px-5 cursor-pointer flex items-start gap-2"
          >
            <Tenants />
            Properties
          </Link>
        </div>
      </nav>
    </>
  );
};

export default SidebarMenu;
