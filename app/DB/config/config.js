require("dotenv").config();

export const development = {
  database: process.env.DATABASE_NAME_DEV,
  username: process.env.DATABASE_USERNAME_DEV,
  password: process.env.DATABASE_PASSWORD_DEV,
  host: process.env.DATABASE_HOST_DEV,
  dialect: "postgres",
};
export const test = {
  database: process.env.DATABASE_NAME_TEST,
  username: process.env.DATABASE_USERNAME_TEST,
  password: process.env.DATABASE_PASSWORD_TEST,
  host: process.env.DATABASE_HOST_TEST,
  dialect: "postgres",
};
export const production = {
  database: process.env.DATABASE_NAME_PROD,
  username: process.env.DATABASE_USERNAME_PROD,
  password: process.env.DATABASE_PASSWORD_PROD,
  host: process.env.DATABASE_HOST_PROD,
  dialect: "postgres",
};
