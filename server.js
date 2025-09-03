const express = require("express");
const cors = require("cors");
const bycrypt = require("bcrypt");
const { User } = require("./models");
const app = express();

app.use(cors());
app.use(express.json());

app.post("register", async (req, res) => {});

app.post("/login", async (req, res) => {});

app.listen(3000, () => console.log("Server running on port 3000"));
