import * as bcryptjs from "bcryptjs";

export const hashValue = async (value: string, saltRounds: number = 10) =>
  await bcryptjs.hash(value, saltRounds);

export const compareValue = async (value: string, hashedValue: string) =>
  await bcryptjs.compare(value, hashedValue);
