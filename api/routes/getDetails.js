import express from "express";

import { car } from "../controllers/getDetails.js";
const router = express.Router();

router.get("/description/:_id", car);

export default router;
