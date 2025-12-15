import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import pool from "./db.js";


const app = express();
app.use(cors());
app.use(express.json());


// SIGNUP
app.post("/api/signup", async (req, res) => {
try {
const { name, email, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);


await pool.query(
"INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
[name, email, hashedPassword]
);


res.json({ message: "Signup successful" });
} catch (error) {
res.status(400).json({ message: "User already exists" });
}
});


// LOGIN
app.post("/api/login", async (req, res) => {
const { email, password } = req.body;


const [rows] = await pool.query(
"SELECT * FROM users WHERE email = ?",
[email]
);


if (rows.length === 0) {
return res.status(401).json({ message: "Invalid credentials" });
}


const user = rows[0];
const isMatch = await bcrypt.compare(password, user.password);


if (!isMatch) {
return res.status(401).json({ message: "Invalid credentials" });
}


res.json({
message: "Login successful",
user: { id: user.id, name: user.name }
});
});


app.listen(5000, () => {
console.log("Backend running at http://localhost:5000");
});