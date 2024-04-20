import SavedUnitsModal from "@/components/tenant/SavedUnits/SavedUnitModal";
import SavedUnitsCard from "@/components/tenant/SavedUnits/SavedUnitsCard";
import { useGetAllSavedItemsQuery } from "@/redux/features/propertyOwner/savedItemApi";
import React, { useState } from "react";

const page = () => {
    const query = {};

    const [itemType, setItemType] = useState("PROPERTY");

    query["itemType"] = itemType;

    const { data, isLoading, isError } = useGetAllSavedItemsQuery({ ...query });
    let content = null;
    if (isError) {
        content = <p>Something went wrong!!!</p>
    }
    if (!isError && isLoading) {
        content = <div className="py-5 flex justify-center">
            <Loader size="lg" />
        </div>
    }
    if (!isError && !isLoading && data && data.length == 0) {

        content = <p>No data available!!!</p>
    }

    if (!isError && !isLoading && data && data.length > 0) {

        content = data.map((unit) => (
            <SavedUnitsCard unitInfo={unit} />
        ))
    }


    return (
        <div>
            <div className="flex justify-center">
                <h2 className="text-4xl font-medium">Saved Tenants</h2>
            </div>
            {/* Available units card start */}
            <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {content}
            </div>
            {/* modal */}
            <SavedUnitsModal open={modalOpen} setOpen={setModalOpen} availableUnits={data} units={units} />
            {/* Available units card end */}
        </div>

    );
};

export default page;
