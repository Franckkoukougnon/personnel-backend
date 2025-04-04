const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Employee = sequelize.define("Employee", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_embauche: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  poste: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Employee;
