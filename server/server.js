import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Setup ESM path tools
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFile = path.join(__dirname, "users.json");

// Middleware
app.use(cors());
app.use(express.json());

// Load users
function loadUsers() {
  if (!fs.existsSync(usersFile)) {
    console.log("📂 users.json file not found. Creating new one.");
    return {};
  }

  try {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data || "{}");
  } catch (err) {
    console.error("❌ Failed to read users.json:", err);
    return {};
  }
}


// Save users
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Signup Route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }

  const users = loadUsers();

  if (users[username]) {
    console.log("❌ Attempted to sign up with existing username:", username);
    return res.status(409).json({ error: "Username already exists" });
  }

  users[username] = { password };
  console.log("📝 Current users before saving:", users);

  fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("❌ Failed to save users.json:", err);
      return res.status(500).json({ error: "Server error while saving user" });
    }

    console.log("✅ New user signed up:", username);
    res.status(200).json({ message: "Signup successful" });
  });
});


// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  console.log("🧪 Login attempt:", username);

  if (!users[username]) {
    console.log("❌ User not found:", username);
    return res.status(401).json({ error: "User not found" });
  }

  if (users[username].password !== password) {
    console.log("❌ Incorrect password for:", username);
    return res.status(403).json({ error: "Incorrect password" });
  }

  console.log("✅ Login successful:", username);
  res.status(200).json({ message: "Login successful" });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
