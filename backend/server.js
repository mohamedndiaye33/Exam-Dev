const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const SECRET = "monsecret";
const DB_FILE = "./users.json";

// 📂 lire les users depuis fichier
const getUsers = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

// 💾 sauvegarder users
const saveUsers = (users) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
};

// REGISTER
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const users = getUsers();

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Email déjà utilisé" });
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);

  saveUsers(users);

  res.json({ message: "Inscription réussie" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();

  console.log("👥 USERS:", users);

  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Identifiants invalides" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Connexion réussie",
    token,
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});