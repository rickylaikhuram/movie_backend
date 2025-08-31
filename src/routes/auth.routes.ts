// server/routes/authRoutes.ts
import { Router } from "express";
import {
  identifySessionUser,
  signInInputValidation,
  signUpInputValidation,
} from "../middlewares/auth/auth.middlewares.js";
import {
  handleSignIn,
  handleSignUp,
  responseUser,
} from "../controllers/auth.controller.js";

const router = Router();

//get current user
router.get("/me", identifySessionUser, responseUser);

/* -------------------- SIGN UP -------------------- */

// sign-up user route
router.post(
  "/signup",
  identifySessionUser,
  signUpInputValidation,
  handleSignUp
);

// /* -------------------- SIGN IN -------------------- */

// Password-based sign-in
router.post(
  "/signin/password",
  identifySessionUser,
  signInInputValidation,
  handleSignIn
);

export default router;
