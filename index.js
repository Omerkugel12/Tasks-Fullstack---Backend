const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

async function main() {
  await connectDB();

  app.use(express.static("public"));

  app.use(express.json());

  app.use(cors());

  //ROUTES

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
