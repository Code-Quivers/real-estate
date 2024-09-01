import DashboardLayout from "../layout/DashboardLayout";
import HomeLayoutProvider from "@/components/Common/Layouts/HomeLayoutProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HomeLayoutProvider>
      <div className="bg-[#F5F5F9]">
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </HomeLayoutProvider>
  );
};

export default layout;
