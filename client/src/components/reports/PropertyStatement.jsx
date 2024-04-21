import { MdKeyboardArrowLeft } from "react-icons/md";
import apartment from "../../assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
const PropertyStatement = () => {
  return (
    <>
      <section>
        <h1 className="font-medium text-xl text-center my-5">Reports</h1>
        <main className="px-5">
          <div className="border border-gray-400 px-5 relative">
            <span className="absolute pt-2">
              <MdKeyboardArrowLeft size={40} />
            </span>
            <h2 className="text-center py-4 font-medium text-xl">Monthly property statement - property A</h2>
            <div className="px-16">
              {/* image card of property */}
              <div className="border-stone-300 shadow rounded-md border h-60 p-2 bg-white flex flex-col lg:flex lg:flex-row gap-10">
                <Image className="h-full w-2/5 object-cover rounded-md" src={apartment} alt="apartment" />
                <div className="py-6 w-3/5 space-y-2">
                  <p>$1200</p>
                  <p>3 Beds 3 Baths</p>
                  <p>3 Belair Dr, Binghamton, NY 13921</p>
                  <div className="border w-1/2 border-stone-400 rounded-md p-2 flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center">
                      <span>
                        <FaUser size={20} className="text-gray-500" />
                      </span>
                    </div>
                    <p>Tenant Name</p>
                  </div>
                </div>
              </div>
              
              <section className="mt-10 space-y-3">
                <div className="flex gap-14">
                  <div className="flex w-1/2 border py-3 px-10 rounded-lg justify-between bg-white shadow-sm">
                    <p>Monthly Rent</p>
                    <p>$1200</p>
                  </div>
                  <div className="flex w-1/2 border py-3 px-10 rounded-lg justify-between bg-white shadow-sm">
                    <p>Monthly Expense</p>
                    <p>$350</p>
                  </div>
                </div>
                <div className="flex gap-14">
                  <div className="flex w-1/2 border py-3 px-10 rounded-lg justify-between bg-white shadow-sm">
                    <p>Monthly Rent</p>
                    <p>$1200</p>
                  </div>
                  <div className="flex w-1/2 border py-3 px-10 rounded-lg justify-between bg-white shadow-sm">
                    <p>Monthly Expense</p>
                    <p>$350</p>
                  </div>
                </div>
              </section>

              {/*  */}
              <section className="my-6">
                <h1 className="text-center text-xl">
                  You are <span className="text-green-500">profitable</span>
                </h1>
                <div className="flex gap-40 text-white mt-6">
                  <button className="bg-[#29429F] w-1/2 p-4 rounded-full">Download</button>
                  <button className="bg-[#29429F] w-1/2 p-4 rounded-full">Edit</button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default PropertyStatement;
