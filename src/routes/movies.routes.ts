import { Router } from "express";
import { identifySessionUser } from "../middlewares/auth/auth.middlewares.js";

const router = Router();

// get all movies
router.get("/movies", identifySessionUser);

// get specific movies details
router.get("/movies/:id", identifySessionUser);

// get specific movies reviews
router.get("/movies/:id/reviews", identifySessionUser);

export default router;
