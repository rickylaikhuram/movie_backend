import { Router } from "express";
import { identifySessionUser, isAdmin, } from "../middlewares/auth/auth.middlewares.js";
import { movieInputValidation } from "../middlewares/admin/admin.middlewares.js";
import { getAllUser, getUserDetails, handleAddMovie, handleDeleteMovie, handleUpdateMovie, } from "../controllers/admin.controller.js";
const router = Router();
router.post("/movies", identifySessionUser, isAdmin, movieInputValidation, handleAddMovie);
router.put("/movies/:id", identifySessionUser, isAdmin, movieInputValidation, handleUpdateMovie);
router.delete("/movies/:id", identifySessionUser, isAdmin, handleDeleteMovie);
router.get("/user", identifySessionUser, isAdmin, getAllUser);
router.get("/user/:userId", identifySessionUser, isAdmin, getUserDetails);
export default router;
//# sourceMappingURL=admin.routes.js.map