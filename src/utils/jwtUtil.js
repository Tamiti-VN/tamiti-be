import "dotenv/config";
import jwt from "jsonwebtoken";
export const generateAccessToken = (payload) => {
  // console.log({ payloadAT: payload });
  const accessToken = jwt.sign({ payload }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
  return accessToken;
};

export const generateRefreshToken = (payload) => {
  // console.log({ payloadRT: payload });
  const accessToken = jwt.sign({ payload }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "30d" });
  return accessToken;
};
