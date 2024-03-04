export const createUserParsedData = (values: any) => {
  const parsedData = {
    ...values,
    date_of_birth: new Date(
      `${values.date_of_birth_day}/${values.date_of_birth_month}/${values.date_of_birth_year}`
    ),
  };

  delete parsedData.date_of_birth_day;
  delete parsedData.date_of_birth_month;
  delete parsedData.date_of_birth_year;

  return parsedData;
};
