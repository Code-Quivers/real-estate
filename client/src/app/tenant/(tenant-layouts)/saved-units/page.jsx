import SavedUnitsCard from "@/components/tenant/SavedUnits/SavedUnitsCard";

export const metadata = {
  title: "Saved Units",
};

const page = () => {
  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto lg:px-5 2xl:px-0 mx-auto">
      <div className="flex justify-center ">
        <h2 className="text-3xl font-medium">Saved Units</h2>
      </div>
      <div>
        <SavedUnitsCard />
      </div>
    </div>
  );
};

export default page;
