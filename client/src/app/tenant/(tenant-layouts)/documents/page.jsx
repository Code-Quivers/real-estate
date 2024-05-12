import TenantDocuments from "@/components/tenant/TenantDocuments/TenantDocuments";

export const metadata = {
  title: "Documents",
};

const page = () => {
  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto lg:px-5 2xl:px-0  px-2 mx-auto">
      <div className="text-center ">
        <h2 className="text-2xl mb-3">Document</h2>
      </div>
      {/*  */}
      <div>
        <TenantDocuments />
      </div>
    </div>
  );
};

export default page;
