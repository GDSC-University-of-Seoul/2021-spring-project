<<<<<<< HEAD
require("dotenv").config();
=======
require('dotenv').config();
>>>>>>> fix config error

const env = process.env;

const development = {
  database: env.DATABASE_NAME_DEV,
  username: env.DATABASE_USERNAME_DEV,
  password: env.DATABASE_PASSWORD_DEV,
  host: env.DATABASE_HOST_DEV,
  port: env.DATABASE_PORT_DEV,
  ssl: env.DATABASE_SSL_DEV,
<<<<<<< HEAD
  dialect: "postgres",
=======
  dialect: 'postgres',
>>>>>>> fix config error
};

const production = {
  database: env.DATABASE_NAME_PROD,
  username: env.DATABASE_USERNAME_PROD,
  password: env.DATABASE_PASSWORD_PROD,
  host: env.DATABASE_HOST_PROD,
  port: env.DATABASE_PORT_PROD,
  ssl: env.DATABASE_SSL_PROD,
<<<<<<< HEAD
  dialect: "postgres",
=======
  dialect: 'postgres',
>>>>>>> fix config error
};

const test = {
  database: env.DATABASE_NAME_TEST,
  username: env.DATABASE_USERNAME_TEST,
  password: env.DATABASE_PASSWORD_TEST,
  host: env.DATABASE_HOST_TEST,
  port: env.DATABASE_PORT_TEST,
  ssl: env.DATABASE_SSL_TEST,
<<<<<<< HEAD
  dialect: "postgres",
=======
  dialect: 'postgres',
>>>>>>> fix config error
};

module.exports = { development, production, test };
