import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

// membership registration
router.post("/signup", authController.signup);

// log in
router.post("/login", authController.login);

// log in active

export default router;
