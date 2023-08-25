export const differenceInMonths = (dateTo: any, dateFrom: any) => {
  const diffInMs = dateTo - dateFrom;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  const months = Math.floor(diffInDays / 30);
  const days = Math.floor(diffInDays % 30);
  return {
    months,
    days,
  };
};
