"use client";

import moment from "moment";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { IconButton } from "rsuite";

const SingleReport = ({ report }) => {
  return (
    <div className="flex justify-between border shadow bg-white rounded-lg hover:bg-gray-100 duration-300 p-5 w-full ">
      <div className="space-y-2">
        <h2>{report?.reportTitle}</h2>
        <p className="text-xs">Added: {moment(report?.createdAt).format("LLL")}</p>
      </div>
      <div className="flex gap-1">
        {/* view */}
        <Link href={`/property-owner/reports/${report?.reportId}`}>
          <IconButton className="hover:!bg-black/10" circle icon={<FaRegEye className="text-[#1565c0]" size={20} />} />
        </Link>
        {/* download */}
        {/* <div>
          <IconButton className="hover:!bg-black/10" circle icon={<FcDownload size={20} />} />
        </div> */}
      </div>
    </div>
  );
};

export default SingleReport;
