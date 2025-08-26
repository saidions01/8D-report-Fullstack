import express from "express";
import { saveReport } from "../controllers/reportController.js";

const router = express.Router();

router.post("/", saveReport);

export default router;
