const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

const bcrypt=require('bcryptjs')

router.post(
  "/createuser",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password is too Short.").isLength({ min: 8 }),
    body("name", "Name is too Short.").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
const salt=await bcrypt.genSalt(10);
const securePass=await bcrypt.hash(req.body.password, salt)
    try {
      User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
