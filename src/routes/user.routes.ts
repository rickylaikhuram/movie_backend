import { Router } from "express";
import {
  identifySessionUser,
  isUser,
} from "../middlewares/auth/auth.middlewares.js";

const router = Router();

// get users data
router.get("/users/:id", identifySessionUser, isUser);

// update users data
router.put("/users/:id", identifySessionUser, isUser);

// create reviews
router.post("/movies/:movieId/reviews", identifySessionUser, isUser);

// update reviews
router.post("/movies/:movieId/reviews/:reviewId", identifySessionUser, isUser);

// create watchlist
router.post("/users/watchlist", identifySessionUser, isUser);

// get watchlist
router.get("/users/watchlist", identifySessionUser, isUser);

// delete watchlist
router.delete("/users/watchlist/:movieId", identifySessionUser, isUser);

export default router;
