//import der Funktion getLineData von controller
import { Router } from "express";
import { getLineData } from "./linediagramm.controller.js";

// router wird definiert
const router = Router();

router.post("/", getLineData);
// router wird exportiert
export { router };
