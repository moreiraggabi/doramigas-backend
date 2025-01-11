import bcrypt from "bcrypt";

const passwordSalt = process.env.SALT_PASSWD;

export const encriptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
