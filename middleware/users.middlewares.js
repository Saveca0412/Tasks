const express = require("express");
const { User } = require("../models/user.model");

const validateUserExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    req.user = user;
  } catch (error) {
    console.log(error);
  }
  next();
};

const checkEmailExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { email } = req.body;
    const emailIs = await User.findOne({ where: { email } });
    if (emailIs) {
      return res.status(409).json({
        status: "error",
        message: `${email} (Already exists in our database)`,
      });
    }
    req.user = user;
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = { validateUserExists, checkEmailExists };
