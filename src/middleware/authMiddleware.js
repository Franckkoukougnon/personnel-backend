const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const autheader = req.headers["authorization"];
  const token = autheader && autheader.split(" ")[1]; // Bearer TOKEN

  // Check if token is provided
  if (!token) return res.status(403).json({ message: "Token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier le token
    req.user = decoded; // Ajout des infos du user au req
    next(); // Passer au middleware suivant ou à la route
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next(); // Passer au middleware suivant ou à la route
  } else {
    return res
      .status(403)
      .json({ message: "Accès refusé : vous n'etes pas admin" });
  }
};

module.exports = { verifyToken, isAdmin };
