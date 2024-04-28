"use client";

import moment from "moment";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { FcDownload } from "react-icons/fc";
import { IconButton } from "rsuite";

const SingleReport = ({ report }) => {
  return (
    <>
      <div>
        <h2>{report?.reportTitle}</h2>
        <p>Added: {moment(report?.createdAt).format("L")}</p>
      </div>
      <div className="flex gap-1">
        <Link href="/property-owner/reports/statement">
          <IconButton className="hover:!bg-black/10" circle icon={<FaRegEye className="text-[#1565c0]" size={20} />} />
        </Link>
        <div>
          <IconButton className="hover:!bg-black/10" circle icon={<FcDownload size={20} />} />
        </div>
      </div>
    </>
  );
};

export default SingleReport;
