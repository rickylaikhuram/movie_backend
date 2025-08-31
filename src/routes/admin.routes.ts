import { Router } from "express";
import { identifySessionUser, isAdmin } from "../middlewares/auth/auth.middlewares.js";

const router = Router();

router.post("/movies",identifySessionUser,isAdmin);
router.post("/movies",identifySessionUser,isAdmin);
router.post("/movies",identifySessionUser,isAdmin);
router.post("/movies",identifySessionUser,isAdmin);
router.post("/movies",identifySessionUser,isAdmin);
router.post("/movies",identifySessionUser,isAdmin);
router.post("/movies",identifySessionUser,isAdmin);
router.post("/movies",identifySessionUser,isAdmin);
export default router;
