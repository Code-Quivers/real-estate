import { changeScoreStatus } from "@/utils/scoreStatus";
const Score = ({ score, total }) => {
  return (
    <div className={`${changeScoreStatus(score)}`}>
      <div className=" flex w-full flex-col justify-center items-center">
        <span className="font-medium">{score}</span>
        <span className="w-[70%] border-t border-[#b6b6b6]" />
        <span className="font-medium">{total}</span>
      </div>
    </div>
  );
};

export default Score;
