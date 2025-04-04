const app = require("../index.js");
const sequelize = require("./config/database.js");

const PORT = process.env.PORT || 3000;

// Sync the database and start the server
async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
