// utils/generateJoinCode.ts

export const generateJoinCode = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};
