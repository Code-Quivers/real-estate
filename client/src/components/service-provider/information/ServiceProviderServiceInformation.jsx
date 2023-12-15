"use client";

import { Button, Input, InputNumber, SelectPicker } from "rsuite";

const data = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const ServiceProviderServiceInformation = () => {
  return (
    <div className="mt-10">
      {/* title */}
      <div className="flex justify-center">
        <h2 className="font-semibold text-2xl">Service Information</h2>
      </div>
      {/* forms */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
        {/* left */}
        <div className="col-span-2 space-y-5">
          <div>
            <label className="text-sm font-medium">Service Type</label>
            <div>
              <SelectPicker
                data={data}
                searchable={false}
                style={{ width: 224 }}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Service Description</label>
            <Input as="textarea" rows={6} />
          </div>
          <div>
            <label className="text-sm font-medium">Service Price Range</label>
            <div style={{ width: 224 }}>
              <InputNumber min={0} />
            </div>
          </div>
        </div>
        {/* right */}
        <div className="col-span-2 space-y-5">
          <div>
            <label className="text-sm font-medium">Service Availability</label>
            <div>
              <SelectPicker
                data={data}
                searchable={false}
                style={{ width: 224 }}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Service Location</label>

            <Input type="text" />
          </div>
          <div>
            <label className="text-sm font-medium">
              Service Cancellation Policy
            </label>
            <Input as="textarea" rows={6} />
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-end">
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default ServiceProviderServiceInformation;
