import { average, bad, good } from "@/constants/score.style";

export const changeScoreStatus = (score) => {
  if (score >= 7) {
    return good;
  } else if (score >= 4) {
    return average;
  } else {
    return bad;
  }
};
