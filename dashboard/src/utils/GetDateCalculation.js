export const getPackageExpiredDates = (paidTo) => {
  const paidToDate = new Date(paidTo);
  const now = new Date();

  // Calculate the date one month after the paidTo date
  const oneMonthLater = new Date(paidToDate);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

  // Check if the current date is past the paidTo date
  const hasExpired = now > paidToDate;

  // Check if the current date is more than one month past the paidTo date
  const moreThanOneMonthExpired = now > oneMonthLater;

  return {
    hasExpired,
    moreThanOneMonthExpired,
  };
};
