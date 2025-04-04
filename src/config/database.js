const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: "mysql", // Database dialect (e.g., mysql, postgres, sqlite, etc.)
    logging: false, // Disable logging; default: console.log
    port: process.env.DB_PORT, // Database port
  }
);

module.exports = sequelize;
