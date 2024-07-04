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
  const authRoutes = require("./routes/auth.route");
  const userRoutes = require("./routes/user.route");

  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
