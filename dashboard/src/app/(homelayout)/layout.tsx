import Header from "@/components/Common/Headers/Header";
import Sidebar from "@/components/Common/Sidebar/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="grid grid-cols-10 gap-10 ">
        <div className="col-span-2 border w-full">
          <Sidebar />
        </div>
        <div className="col-span-8 border">
          <div>
            <Header />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default layout;
