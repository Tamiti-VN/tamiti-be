import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

export const hashPassword = async (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

export const compareHashPassword = async (password, hashPassword) => {
  let compareHashPassword = bcrypt.compareSync(password, hashPassword);
  return compareHashPassword;
};
