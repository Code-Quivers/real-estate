const Score = ({ isLoading, score, total }) => {
  return (
    <>
      <div
        className={`${score >= 7 ? "outline-[#58ba66]" : score >= 4 ? "outline-yellow-500" : score <= 3 ? "outline-red-500" : ""} outline outline-4 rounded-full px-4`}
      >
        <div className="flex w-full flex-col justify-center items-center">
          <span className="font-medium">{isLoading ? 0 : score}</span>
          <span className="w-[70%] border-t border-[#b6b6b6]" />
          <span className="font-medium">{isLoading ? 10 : total}</span>
        </div>
      </div>
    </>
  );
};

export default Score;
