import jwt from "jsonwebtoken";
import { IJwtPayload } from "../interfaces/error";

export const createToken = (
  payload: IJwtPayload,
  secretKey: string,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};
