const dotenv = require("dotenv");
const { Sequelize, DataTypes } = require("sequelize");

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB } = process.env;

const datab = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB,
  logging: false,
});

module.exports = { datab, DataTypes };
