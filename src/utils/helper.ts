import * as argon2 from 'argon2';

export const hashPassword = async (rawPassword: string) => {
  return argon2.hash(rawPassword, {
    type: argon2.argon2id,
  });
};

export const compareHashPassword = async (
  rawPassword: string,
  hashedPassword: string,
) => {
  return argon2.verify(rawPassword, hashedPassword);
};
