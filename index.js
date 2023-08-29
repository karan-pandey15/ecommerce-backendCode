const express = require("express");
const app = express();
const USER = require("./Model/userSchema");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
require("./database");
app.use(require("./Routes/curdApi"));

app.get("/", (req, res) => {
  res.send("hello from home side");
});

app.post("/createUser", (req, res) => {
  USER.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
});

app.listen(PORT, () => {
  console.log("listening to Port ", PORT);
});
