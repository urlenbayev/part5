require("dotenv").config();

const port = process.env.PORT;
const mongoUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DB_CONNECTION_URL
    : process.env.TEST_DB_CONNECTION_URL;

module.exports = {
  port,
  mongoUrl,
};
