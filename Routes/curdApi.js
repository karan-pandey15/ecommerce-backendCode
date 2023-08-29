const express = require("express");
const router = express.Router();
const USER = require("../Model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const Secret_key = `ADFDEERARFARRTERERERERERRERERER SRTRTRTRTdfaterr`;
const Secret_key = process.env.Secret_key;

// Create The User

router.post("/createUser", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const userData = await USER.create({
    name,
    email,
    phone,
    password,
  });

  if (!userData) {
    res.status(500).json({
      success: false,
      message: "some error occurs",
    });
  } else {
    res.status(201).json({
      success: true,
      message: "user Create SuccessFully....",
      userData,
    });
  }
});

router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "please fill the  password and email .....",
      });
    }

    const userData = await USER.findOne({ email: email });
    if (userData) {
      const isMatch = await bcrypt.compare(password, userData.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credientials" });
      } else {
        const data = {
          user: {
            id: userData.id,
          },
        };
        const authToken = jwt.sign(data, Secret_key);
        const karan = res.cookie("authToken", authToken);

        res.status(200).json({
          message: "user Signin suuccessFully...",
          authToken: authToken,
        });
        console.log(req.body);
        console.log(authToken);
      }
    } else {
      return res.status(400).json({ error: "user invalid credientals..." });
    }
  } catch (err) {
    console.log(err);
  }
});

// Read The User
router.get("/readuser", async (req, res) => {
  const userData = await USER.find({});

  if (!userData) {
    res.status(501).json({
      success: true,
      message: "some error occurs",
    });
  } else {
    res.status(201).json({
      success: true,
      userData,
    });
  }
});

// Read One data
router.get("/getone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userone = await USER.findById(id);
    res.status(201).json(userone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
