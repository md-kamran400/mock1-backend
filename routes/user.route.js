const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModle } = require("../models/user.model");
const { BlackListModel } = require("../models/blacklist.model");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModle.findOne({ email });
    if (user) {
      res.status(400).json({ mag: "user alredy regisetred" });
    } else {
      bcrypt.hash(req.body.password, 10, async (error, hash) => {
        if (hash) {
          const newUser = new UserModle({
            ...req.body,
            password: hash,
          });
          await newUser.save();
          res.status(200).json({ msg: "User Register successFuly" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModle.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          let token = jwt.sign({ userID: user._id }, "kamran");
          res.status(200).json({ msg: "user Logged in SunccessFull", token });
        } else {
          res.status(200).json({ msg: "incorrect Passorwd" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.get("/logout", async (re, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (token) {
      await BlackListModel.updateMany({}, { $push: { blacklist: [token] } });
      res.status(200).send("logout successFull");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { userRouter };
