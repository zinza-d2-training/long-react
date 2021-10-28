export const isNumberOrNull = (input: string): boolean => {
  return /^[0-9]*$/.test(input);
};
