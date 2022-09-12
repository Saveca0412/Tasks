const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMSG = errors.array().map(err => {
      return err.msg;
    });
    let message = errorsMSG.join(". ");
    return res.status(400).json({ status: "error", message });
  }
  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be String")
    .notEmpty()
    .withMessage("Name can not be empty")
    .isLength({ min: 3 }, { max: 10 })
    .withMessage("min length is 3 and max 8 characters"),
  body("email").isEmail().withMessage("Must be an valid email"),
  body("password")
    .isString()
    .withMessage("Password must be String")
    .notEmpty()
    .withMessage("Password can not be empty")
    .isLength({ min: 8 }, { max: 8 })
    .withMessage("Password can't be diferent than 8 characters"),
  checkValidations,
];

const createTaskValidators = [
  body("title")
    .isString()
    .withMessage("title must be string")
    .isLength({ min: 4 })
    .withMessage("title must be min 4 characters long"),
  body("userId").isNumeric().withMessage("userId must be number"),
  checkValidations,
];

module.exports = { createUserValidators, createTaskValidators };
