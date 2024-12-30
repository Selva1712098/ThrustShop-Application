import express from "express";
import { sellCars } from "../controllers/sellCars.js";
const router = express.Router();

router.post("/sellCars", sellCars);

export default router;
