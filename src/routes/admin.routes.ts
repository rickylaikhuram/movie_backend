import { Router } from "express";
import {
  identifySessionUser,
  isAdmin,
} from "../middlewares/auth/auth.middlewares.js";
import { movieInputValidation } from "../middlewares/admin/admin.middlewares.js";
import {
  handleAddMovie,
  handleUpdateMovie,
} from "../controllers/admin.controller.js";

const router = Router();

router.post(
  "/movies",
  identifySessionUser,
  isAdmin,
  movieInputValidation,
  handleAddMovie
);

router.put(
  "/movies/:id",
  identifySessionUser,
  isAdmin,
  movieInputValidation,
  handleUpdateMovie
);

router.delete("/movies/:id", identifySessionUser, isAdmin,
    
);
export default router;
