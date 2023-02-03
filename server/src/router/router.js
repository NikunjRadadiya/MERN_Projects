const express = require("express");
const bcrypt = require("bcryptjs");
const Register = require("../model/model");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    Register.findOne({ email }, async (err, user) => {
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user) {
          const token = await user.generateAuthToken();
          console.log("login token :" + token);
          if (isMatch) {
            res.send({ message: "login successfully", user });
          } else {
            res.send({ message: "password is incorrect" });
          }
        } else {
          res.send({ message: "user is not register" });
        }
      } catch (err) {
        if (err) throw err;
      }
    });
  } catch (err) {
    if (err.message) throw err;
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  Register.findOne({ email }, async (err, user) => {
    if (user) {
      res.send({ message: "user already register" });
    } else {
      try {
        const user = new Register(req.body);

        const token = await user.generateAuthToken();
        console.log("register token :" + token);

        user.save((err) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).send({
              message: "successfully register, now login please",
              user,
            });
          }
        });
      } catch (err) {
        if (err) throw err;
      }
    }
  });
});

module.exports = router;
