const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController.js");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware.js"); // Protection des routes

router.post("/", verifyToken, isAdmin, employeeController.createEmployee); // Route pour créer un employé
router.get("/", verifyToken, employeeController.getAllEmployees); // Route pour récupérer tous les employés
router.get("/:id", verifyToken, employeeController.getEmployeeById); // Route pour récupérer un employé par ID
router.put("/:id", verifyToken, isAdmin, employeeController.updateEmployee); // Route pour mettre à jour un employé
router.delete("/:id", verifyToken, isAdmin, employeeController.deleteEmployee); // Route pour supprimer un employé

module.exports = router;
