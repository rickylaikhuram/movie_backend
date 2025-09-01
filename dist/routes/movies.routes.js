import { Router } from "express";
import { identifySessionUser } from "../middlewares/auth/auth.middlewares.js";
import { getAllMovies, getMovie, getMovieReview } from "../controllers/movie.controller.js";
const router = Router();
// get all movies
router.get("/", identifySessionUser, getAllMovies);
// get specific movies details
router.get("/:id", identifySessionUser, getMovie);
// get specific movies reviews
router.get("/:id/reviews", identifySessionUser, getMovieReview);
export default router;
//# sourceMappingURL=movies.routes.js.map