// server/routes/authRoutes.ts
import { Router } from "express";
// import {
//   userSignInInputValidationMiddleware,
//   userSignupInputValidationMiddleware,
//   validateOtpInput,
//   validatePhone,
// } from "../middlewares/validate.middlewares";
// import {
//   handleUserSignUpVerify,
//   handleResendSignupOtp,
//   handleVerifiedUserSignup,
//   handleUserSignin,
//   handleOtpSigninInitiate,
//   handleUserSigninWithOtp,
//   logoutUser,
// } from "../controllers/auth.controller";
import {
  identifySessionUser,
  signInInputValidationMiddleware,
  signUpInputValidationMiddleware,
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
  signUpInputValidationMiddleware,
  handleSignUp
);

// /* -------------------- SIGN IN -------------------- */

// Password-based sign-in
router.post(
  "/signin/password",
  identifySessionUser,
  signInInputValidationMiddleware,
  handleSignIn
);

// // OTP sign-in: Step 1 - Send OTP
// router.post(
//   "/signin/otp/initiate",
//   identifySessionUser,
//   validatePhone,
//   handleOtpSigninInitiate
// );

// // OTP sign-in: Step 2 - Verify OTP
// router.post(
//   "/signin/otp/verify",
//   identifySessionUser,
//   validateOtpInput,
//   handleUserSigninWithOtp
// );

// /* -------------------- LOGOUT -------------------- */

// router.post("/logout", logoutUser);

export default router;
