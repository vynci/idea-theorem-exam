export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDays = (monthInput: number) => {
  const getDaysInMonth = (month: number) => {
    switch (month) {
      case 2: // February
        return 28; // Assuming non-leap year for simplicity
      case 4:
      case 6:
      case 9:
      case 11: // April, June, September, November
        return 30;
      default:
        return 31; // All other months
    }
  };

  const createDaysArray = (month: number) => {
    const daysInMonth = getDaysInMonth(month);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return daysArray.map((item) => item.toString());
  };

  return createDaysArray(monthInput);
};

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1920;
  const yearsArray = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );
  return yearsArray.map((item) => item.toString());
};
