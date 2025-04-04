const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const authRoutes = require("./src/routes/authRoutes.js");
const sequelize = require("./src/config/database.js");
const employeeRoutes = require("./src/routes/employeeRoutes.js");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Synchronize the database and start the server

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
