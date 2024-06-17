const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  client: "mysql2",
  dialect: "mysql",
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
};
