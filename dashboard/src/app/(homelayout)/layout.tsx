import Header from "@/components/Common/Headers/Header";
import Sidebar from "@/components/Common/Sidebar/Sidebar";
import DashboardLayout from "../layout/DashboardLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FAFAFB]">
      <DashboardLayout>{children}</DashboardLayout>
      {/* <div className="grid grid-cols-12 gap-10 ">
        <div className="col-span-2 border w-full">
          <Sidebar />
        </div>
        <div className="col-span-9 border">
          <div>
            <Header />
          </div>
          <div>{children}</div>
        </div>
      </div> */}
    </div>
  );
};

export default layout;
