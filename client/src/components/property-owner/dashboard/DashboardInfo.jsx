import React from 'react'
import { IconButton } from "rsuite";
import { FaPencilAlt } from "react-icons/fa";
import { useGetDashboardInfoQuery } from '@/redux/features/propertyOwner/propertyOwnerApi';


const DashboardInfo = () => {
    const { data, isLoading, isError } = useGetDashboardInfoQuery()
    console.log(data, 'data of dashboard..............')
    return (
        <div className="col-span-1 lg:col-span-3 space-y-3">
            <div className=" flex border   bg-white items-center justify-between px-5 py-6 rounded-2xl">
                <div className="flex gap-3 items-center">
                    <h2 className="text-4xl font-semibold">{data?.data?.numOfRentedUnit || 0}</h2>
                    <p className="text-xl font-medium">Rented Unit</p>
                </div>

                <div className=" outline outline-8 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[50px] h-[50px]">
                    <div className=" flex w-full flex-col justify-center items-center">
                        <span>1</span>
                        <span className="w-[70%] border-t border-[#b6b6b6]" />
                        <span>1</span>
                    </div>
                </div>
            </div>
            <div className="  border bg-white  px-5 py-6   rounded-2xl">
                <h2 className="text-2xl font-semibold">${data?.data?.collectedRentOfCurrentMonth || 0.0}</h2>
                <p className="text-xl font-medium">Rented Collected this month</p>
            </div>
            <div className="  border flex justify-between items-start    px-5 py-6  rounded-2xl bg-white">
                <div>
                    <h2 className="text-2xl font-semibold">${data?.data?.costOfCurretntMonth || 0.0}</h2>
                    <p className="text-xl font-medium">Cost this month</p>
                </div>
                <div>
                    <IconButton icon={<FaPencilAlt size={20} />} appearance="subtle" circle />
                </div>
            </div>
        </div>
    )
}

export default DashboardInfo