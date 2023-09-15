//funktion wird importiert
import { Router } from "express";
import { getPieData } from "./piediagramm.controller.js";
// router wird definiert
const router = Router();

router.post("/", getPieData);

// router wird exportiert
export { router };
