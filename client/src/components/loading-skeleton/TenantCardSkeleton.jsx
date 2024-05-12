const TenantCardSkeleton = ({ label }) => {
  return (
    <div>
      <div role="status" className=" p-2 border bg-white shadow-sm rounded   animate-pulse md:p-3 ">
        <div className="flex mb-4 justify-between items-center ">
          <svg
            className="w-14 h-14 me-3 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <svg className="w-14 h-14" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="gray" strokeWidth="7" />

            {/* Text Above Line */}
            <text x="50" y="40" textAnchor="middle" fontSize="30" fontWeight={500} fill="black">
              10
            </text>
            {/* Line */}
            <line x1="30" y1="50" x2="70" y2="50" stroke="gray" strokeWidth="2" />
            {/* Text Below Line */}
            <text x="50" y="85" textAnchor="middle" fontSize="30" fontWeight={500} fill="black">
              10
            </text>
          </svg>
        </div>
        <div className="my-7">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700  mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>
        <div className="mt-5 ">
          <svg className="button-skeleton text-center" viewBox="0 0 300 50" xmlns="http://www.w3.org/2000/svg">
            {/* First button */}
            <rect x="0" y="0" className="w-[90px] h-[40px] " rx="5" ry="5" fill="#e8f0fe">
              <animate attributeName="opacity" dur="1.5s" values="0.5;1;0.5" repeatCount="indefinite" />
            </rect>
            <text x="45" y="25" textAnchor="middle" fontWeight={600} className="text-sm md:text-base" fill="gray">
              {label ? label : "Save"}
            </text>
            {/* Second button */}
            <rect x="110" y="0" className="w-[90px] h-[40px] " rx="5" ry="5" fill="#e8f0fe">
              <animate attributeName="opacity" dur="1.5s" values="0.5;1;0.5" repeatCount="indefinite" begin="0.5s" />
            </rect>
            <text x="155" y="25" textAnchor="middle" fontWeight={600} className="text-sm md:text-base" fill="gray">
              Contact
            </text>
            {/* Third button */}
            <rect x="220" y="0" className="w-[90px] h-[40px] " alignmentBaseline="middle" textAnchor="center" rx="5" ry="5" fill="#e8f0fe">
              <animate attributeName="opacity" dur="1.5s" values="0.5;1;0.5" repeatCount="indefinite" begin="1s" />
            </rect>
            <text x="265" y="25" textAnchor="middle" fontWeight={600} className="text-sm md:text-base" fill="gray">
              Add
            </text>
          </svg>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default TenantCardSkeleton;
