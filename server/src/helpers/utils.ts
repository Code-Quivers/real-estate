export const isEmptyObject = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

export const incrementMonth = (date:any, months:number)=>{
  let newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}