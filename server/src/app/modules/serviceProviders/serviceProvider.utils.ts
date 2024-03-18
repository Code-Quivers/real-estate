/* eslint-disable @typescript-eslint/no-explicit-any */
export const filterUndefinedOrNullValues = (obj: Record<string, any>): Record<string, any> => {
  const filteredObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
};
