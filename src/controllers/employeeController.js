const Employee = require("../models/Employee.js");

//Ajout d'un employé
exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json({
      message: "Employé créé avec succès",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'employé:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Récupérer tous les employés
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error("Erreur lors de la récupération des employés:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Récupérer un employé par ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'employé:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Mettre à jour un employé
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    await employee.update(req.body);
    res.status(200).json({
      message: "Employé mis à jour avec succès",
      employee,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'employé:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Supprimer un employé
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    await employee.destroy();
    res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'employé:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
