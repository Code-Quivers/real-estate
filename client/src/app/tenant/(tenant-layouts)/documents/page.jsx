import PrimaryButtonForTenant from "@/components/tenant/PrimaryButtonForTenant";
import TenantDocuments from "@/components/tenant/TenantDocuments/TenantDocuments";
import React from "react";
import { Uploader } from "rsuite";

const page = () => {
  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto lg:px-5 2xl:px-0 mx-auto">
      <div className="text-center ">
        <h2 className="text-2xl mb-3">Document</h2>
        <Uploader
          listType="picture-text"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <PrimaryButtonForTenant title="Upload Document" />
        </Uploader>
      </div>
      <TenantDocuments />
    </div>
  );
};

export default page;
