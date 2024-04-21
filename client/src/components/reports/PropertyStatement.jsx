import { MdKeyboardArrowLeft } from "react-icons/md";
import apartment from "../../assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
const PropertyStatement = () => {
  return (
    <>
      <section className="max-w-[1050px]    pb-10  xl:mx-auto md:px-3 lg:px-5 px-2    2xl:px-0 ">
        <div>
          <h1 className="font-medium text-xl text-center my-5">Reports</h1>
        </div>
        <main className="lg:m-5">
          <div className="border max-md:rounded-lg border-gray-300 p-2 md:p-5 lg:p-10 relative">
            <div className="flex items-start gap-2 py-2">
              <MdKeyboardArrowLeft size={40} />
              <h2 className="text-start lg:text-center font-medium text-lg md:text-xl">Monthly property statement - property A</h2>
            </div>

            <div className="lg:px-16">
              {/* image card of property */}
              <div className="border-stone-300 grid grid-cols-1 lg:grid-cols-2   shadow rounded-lg border  p-2 md:p-4 lg:p-2  bg-white lg:gap-7 ">
                <div className="col-span-1 w-full ">
                  <Image className="   object-cover rounded-lg" src={apartment} alt="apartment" />
                </div>
                <div className="max-lg:mt-3 lg:py-6 space-y-2 w-full col-span-1">
                  <p>$1200</p>
                  <p>3 Beds 3 Baths</p>
                  <p>3 Belair Dr, Binghamton, NY 13921</p>
                  <div className="border lg:w-3/4 border-stone-400 rounded-md p-2 flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center">
                      <span>
                        <FaUser size={20} className="text-gray-500" />
                      </span>
                    </div>
                    <p>Tenant Name</p>
                  </div>
                </div>
              </div>
              <section className="grid grid-cols-2 lg:grid-cols-4 mt-10 gap-3 md:gap-6 2xl:gap-x-10">
                <div className="col-span-2 flex  border p-4 rounded-lg">
                  <p>Monthly Rent</p>
                  <p>$1200</p>
                </div>
                <div className="col-span-2 flex  border p-4 rounded-lg">
                  <p>Monthly Expense</p>
                  <p>$350</p>
                </div>

                <div className="col-span-2 flex  border p-4 rounded-lg">
                  <p>Monthly Rent</p>
                  <p>$1200</p>
                </div>
                <div className="col-span-2 flex  border p-4 rounded-lg">
                  <p>Monthly Expense</p>
                  <p>$350</p>
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