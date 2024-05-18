"use client";

import { Button } from "rsuite";

const GenerateMonthlyReportPdf = ({ reportData }) => {
  return (
    <div>
      <div className="my-10 md:mt-20 flex justify-center items-center">
        <Button type="button" size="lg" className="!bg-primary !text-white !rounded-3xl !text-xl !px-10 !py-5 ">
          Download
        </Button>
      </div>
    </div>
  );
};

export default GenerateMonthlyReportPdf;
