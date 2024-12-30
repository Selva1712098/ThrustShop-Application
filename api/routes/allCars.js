import express from "express";
import { allCars } from "../controllers/allCars.js";
const router = express.Router();

router.get("/allCars", allCars);

export default router;
