import dotenv from "dotenv";
import path from "path";

// ** configure the Env File :
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  db_url: process.env.DB_URL,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_token_expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRESIN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_token_expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRESIN,
  jwt_reset_token: process.env.JWT_RESET_TOKEN,
  jwt_reset_token_expiresIn: process.env.JWT_RESET_TOKEN_EXPIRESIN,
  bcrypt_solt_round: process.env.BCRYPT_SOLT_ROUND,
  port: process.env.PORT,
};
