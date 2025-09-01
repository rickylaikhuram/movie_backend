import { Router } from "express";
import {
  identifySessionUser,
  isUser,
} from "../middlewares/auth/auth.middlewares.js";
import {
  createReview,
  getReview,
  getUserProfile,
  getWatchlist,
  getWatchlistIds,
  handleToggleWatchlist,
  updateUserName,
} from "../controllers/user.controller.js";
import { reviewInputValidation } from "../middlewares/user/user.middleware.js";

const router = Router();

// get users data
router.get("/", identifySessionUser, isUser, getUserProfile);

// update users name
router.patch("/name/:id", identifySessionUser, isUser, updateUserName);

// update users email
router.patch("/email/:id", identifySessionUser, isUser, updateUserName);

// create reviews
router.post(
  "/movies/:movieId/reviews",
  identifySessionUser,
  isUser,
  reviewInputValidation,
  createReview
);

// get specific movie reviews
router.get("/reviews", identifySessionUser, isUser, getReview);

// create watchlist
router.post(
  "/watchlist/toggle/:moviesId",
  identifySessionUser,
  isUser,
  handleToggleWatchlist
);

// get watchlist
router.get("/watchlist", identifySessionUser, isUser, getWatchlist);

// get watchlist
router.get("/watchlist/ids", identifySessionUser, isUser, getWatchlistIds);

export default router;
