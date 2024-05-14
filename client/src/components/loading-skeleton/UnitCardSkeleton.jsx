const UnitCardSkeleton = () => {
  return (
    <div className="border  rounded-lg shadow-lg animate-pulse">
      <div className="flex items-center justify-center h-48 mb-4  rounded bg-gray-700">
        <svg className="w-[100px] h-[100px] text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 10V19H18V12H15V19H9V12H4V19H2V10L12 3L22 10H20ZM6 17H8V14H6V17ZM10 17H14V14H10V17ZM18 17H16V14H18V17Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between mt-4 mx-2">
        <div>
          <div className="h-2.5  rounded-full bg-gray-700 w-20 mb-2"></div>
          <div className="w-32 h-2 mb-2  rounded-full bg-gray-700"></div>
          <div className="w-56 h-2  rounded-full bg-gray-700"></div>
        </div>
        <div className="flex mb-4 justify-between items-center ">
          <svg className="w-14 h-14" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="gray" strokeWidth="7" />
            <text x="50" y="40" textAnchor="middle" fontSize="30" fontWeight={500} fill="black">
              10
            </text>
            <line x1="30" y1="50" x2="70" y2="50" stroke="gray" strokeWidth="2" />
            <text x="50" y="85" textAnchor="middle" fontSize="30" fontWeight={500} fill="black">
              10
            </text>
          </svg>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default UnitCardSkeleton;
