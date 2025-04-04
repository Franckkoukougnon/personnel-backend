const Employee = require("../models/Employee.js");
const { Op } = require("sequelize");

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

exports.getAllEmployees2 = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Page actuelle
    const limit = parseInt(req.query.limit) || 10; // Nombre d'employés par page
    const offset = (page - 1) * limit; // Décalage pour la pagination

    const whereCondition = departement
      ? { departement: { [Op.like]: `%${departement}%` } }
      : {};

    const { count, rows } = await Employee.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
    });

    res.json({
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });

    res.status(200).json({
      totalEmployees: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      employees: rows,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des employés:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    let { page, limit, departement } = req.query; // Récupérer les paramètres de la requête
    page = parseInt(page) || 1; // Si 'page' n'est pas défini, par défaut c'est 1
    limit = parseInt(limit) || 10; // Si 'limit' n'est pas défini, par défaut c'est 10
    const offset = (page - 1) * limit;

    // Vérification si un département est spécifié et, si oui, appliquer le filtre
    const whereCondition = departement
      ? { departement: { [Op.like]: `%${departement}%` } }
      : {};

    const { rows, count } = await Employee.findAndCountAll({
      where: whereCondition, // Appliquer le filtre sur 'departement'
      limit,
      offset,
    });

    res.json({
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    console.error(error); // Pour mieux comprendre l'erreur dans la console
    res.status(500).json({ message: "Erreur serveur", error: error.message });
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
