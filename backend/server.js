const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Mot de passe trop court" });
  }

  console.log("Utilisateur reçu :", req.body);

  res.json({ message: "Inscription réussie" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});