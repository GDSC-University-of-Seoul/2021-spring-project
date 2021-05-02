require("dotenv").config();

export const development = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: "kidskeeper_dev",
  dialect: "postgres",
};
export const test = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: "kidskeeper_test",
  dialect: "postgres",
};
export const production = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: "kidskeeper_prod",
  dialect: "postgres",
};
