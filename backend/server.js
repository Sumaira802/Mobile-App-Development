const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "users.json");

// create file if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

// read users
const getUsers = () => {
  const data = fs.readFileSync(DB_PATH, "utf8");
  return JSON.parse(data || "[]");
};

// save users
const saveUsers = (users) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

// HOME
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// SIGNUP (POST)
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  let users = getUsers();

  const exists = users.find(u => u.email === email);

  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  res.json({
    message: "Signup successful",
    user: newUser,
  });
});

// LOGIN (POST)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  let users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user,
  });
});

// GET USERS (CHECK DATA)
app.get("/api/users", (req, res) => {
  res.json(getUsers());
});

// SERVER START
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://192.168.100.164:${PORT}`);
});