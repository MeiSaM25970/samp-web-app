export const fixNumbersWithCommas = (number: number | string) => {
  const stringifyNumber = number.toString();

  return stringifyNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
