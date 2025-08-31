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
  updateUserName,
} from "../controllers/user.controller.js";
import { reviewInputValidation } from "../middlewares/user/user.middleware.js";

const router = Router();

// get users data
router.get(
  "/:id",
  identifySessionUser,
  isUser,
  getUserProfile
);

// update users data
router.put(
  "/:id",
  identifySessionUser,
  isUser,
  updateUserName
);

// create reviews
router.post(
  "/movies/:movieId/reviews",
  identifySessionUser,
  isUser,
  reviewInputValidation,
  createReview
);

// get all reviews
router.get(
  "/movies/:movieId/reviews",
  identifySessionUser,
  isUser,
  getReview
);

// create watchlist
router.post(
  "/watchlist/:movieId",
  identifySessionUser,
  isUser,
  createWatchlist
);

// get watchlist
router.get(
  "/watchlist",
  identifySessionUser,
  isUser,
  getWatchlist
);

// delete watchlist
router.delete(
  "/watchlist/:watchListId",
  identifySessionUser,
  isUser,
  deleteWatchlist
);

export default router;
