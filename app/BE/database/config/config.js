require("dotenv").config();

export const development = {
  database: process.env.DATABASE_NAME_DEV,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  ssl: process.env.DATABASE_SSL,
  dialect: "postgres",
};
export const test = {
  database: process.env.DATABASE_NAME_TEST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  ssl: process.env.DATABASE_SSL,
  dialect: "postgres",
};
export const production = {
  database: process.env.DATABASE_NAME_PROD,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  ssl: process.env.DATABASE_SSL,
  dialect: "postgres",
};
