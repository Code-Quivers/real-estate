import TenantSidebar from "@/components/layouts/TenantSidebar";
import TenantLayoutProvider from "@/components/layouts/tenant/TenantLayoutProvider";
import TenantSidebarDrawer from "@/components/layouts/tenant/TenantSidebarDrawer";

const TenantLayout = ({ children }) => {
  return (
    <TenantLayoutProvider>
      <div className="md:grid md:grid-cols-9 bg-[#f6f7f8] ">
        <div
          className="max-md:hidden
       md:col-span-3 lg:col-span-2 w-full"
        >
          <TenantSidebar />
        </div>
        <div className="col-span-6   lg:col-span-7 ">
          <div className="md:hidden">
            <TenantSidebarDrawer />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </TenantLayoutProvider>
  );
};

export default TenantLayout;
