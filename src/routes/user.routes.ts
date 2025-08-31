import { Router } from "express";
import {
  identifySessionUser,
  isUser,
} from "../middlewares/auth/auth.middlewares.js";
import {
  createReview,
  createWatchlist,
  deleteWatchlist,
  getReview,
  getUserProfile,
  getWatchlist,
  queryExistingUserCheck,
  updateUserName,
} from "../controllers/user.controller.js";
import { reviewInputValidation } from "../middlewares/user/user.middleware.js";

const router = Router();

// get users data
router.get(
  "/:id",
  identifySessionUser,
  isUser,
  queryExistingUserCheck,
  getUserProfile
);

// update users data
router.put(
  "/:id",
  identifySessionUser,
  isUser,
  queryExistingUserCheck,
  updateUserName
);

// create reviews
router.post(
  "/movies/:movieId/reviews",
  identifySessionUser,
  isUser,
  queryExistingUserCheck,
  reviewInputValidation,
  createReview
);

// get all reviews
router.get(
  "/movies/:movieId/reviews",
  identifySessionUser,
  isUser,
  queryExistingUserCheck,
  getReview
);

// create watchlist
router.post(
  "/watchlist/:movieId",
  identifySessionUser,
  isUser,
  queryExistingUserCheck,
  createWatchlist
);

// get watchlist
router.get(
  "/watchlist",
  identifySessionUser,
  isUser,
  queryExistingUserCheck,
  getWatchlist
);

// delete watchlist
router.delete(
  "/watchlist/:watchListId",
  identifySessionUser,
  isUser,
  queryExistingUserCheck,
  deleteWatchlist
);

export default router;
