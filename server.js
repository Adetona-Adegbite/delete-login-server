const express = require("express");
const cors = require("cors");
const bycrypt = require("bcryptjs");
const { User } = require("./models");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bycrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
