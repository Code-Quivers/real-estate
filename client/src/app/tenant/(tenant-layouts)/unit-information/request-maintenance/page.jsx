import { priorityType } from "@/constants/serviceConst";
import { Button, Input, Radio, RadioGroup, SelectPicker } from "rsuite";

const RequestMaintenancePage = () => {
  return (
    <section className="max-w-[1050px] mt-6 2xl:mx-auto sm:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto">
      {/* section title */}
      <div className="flex justify-center mb-5">
        <h2 className="font-semibold text-xl">Request Maintenance</h2>
      </div>
      {/* form */}
      <form>
        <div className="border p-5 border-[#989898] shadow-lg md:grid md:grid-cols-6 max-md:space-y-5 gap-10 items-end">
          <div className="col-span-4   space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Do you have animals?</h2>
              <div>
                <RadioGroup className="" name="isAnimal" inline appearance="picker" defaultValue="A">
                  <Radio value="A">Yes</Radio>
                  <Radio value="B">No</Radio>
                </RadioGroup>
              </div>
              <div>
                <Input as="textarea" placeholder="if you have anything to add regarding animals" rows={4} />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Issue Details</h2>
              <div>
                <Input type="text" placeholder="Issue Location" />
              </div>
            </div>

            <div>
              <SelectPicker searchable={false} data={priorityType} placeholder="Priority" style={{ width: 224 }} />
            </div>
            <div>
              <SelectPicker
                searchable={false}
                placeholder="Issue Type"
                data={["Eugenia", "Bryan", "Linda", "Nancy", "Albert"].map((item) => ({ label: item, value: item }))}
                style={{ width: 224 }}
              />
            </div>
            <div>
              <div className="col-span-4">
                <Input as="textarea" placeholder="Describe the issue..." rows={6} />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col space-y-5">
              <button
                type="button"
                className="bg-[#fff] border border-[#29429f] font-semibold focus-within:text-white focus-within:bg-[#29429f]  rounded-full !py-3"
              >
                Add Photos
              </button>
              <Button size="lg" className="!bg-[#e22620] !rounded-full !py-3">
                Send Request
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RequestMaintenancePage;
