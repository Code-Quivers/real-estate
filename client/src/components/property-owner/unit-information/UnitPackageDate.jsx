import { getPackageExpiredDates } from "@/utils/GetDateCalculation";

const UnitPackageDate = ({ singleProperty }) => {
  return (
    <div>
      {getPackageExpiredDates(singleProperty?.paidTo).hasExpired && (
        <div className="space-y-3">
          <h2 className="text-md font-medium">
            {!getPackageExpiredDates(singleProperty?.paidTo).moreThanOneMonthExpired
              ? "Your unit package expired. Your unit is now disabled."
              : "Your Unit Package is Fully Expired. Please Pay, Otherwise you cant get "}
          </h2>
          <button className="bg-primary px-5 py-2 rounded-3xl text-white">Pay Now</button>
        </div>
      )}
    </div>
  );
};

export default UnitPackageDate;
