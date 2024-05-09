import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export const hashPassword = async (password) => {
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

export const compareHashPassword = async (password, hashPassword) => {
  const compareHashPassword = bcrypt.compareSync(password, hashPassword);
  return compareHashPassword;
};
