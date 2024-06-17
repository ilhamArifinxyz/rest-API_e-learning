const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config("../.env");
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());

// Gunakan router dari authController
const authController = require("./controllers/authController");
app.use("/api/auth", authController);

// Jalankan server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
