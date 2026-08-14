import express from "express";
import * as authController from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("input at least 4 characters")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("special characters are not allowed"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("input at least 4 characters"),
  validate,
];

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("enter your name"),
  body("email").trim().isEmail().withMessage("check the email format"),
  validate,
];

// membership registration
router.post("/signup", validateSignup, authController.signup);

// log in
router.post("/login", validateLogin, authController.login);

// log in active

export default router;
