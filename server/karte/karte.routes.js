// import der funktion von controller
import { Router } from "express";
import { getKarteData } from "./karte.controller.js";

// hier wird ein router definiert für die funktion
const router = Router();

router.post("/", getKarteData);

// der definierte Router wird exportiert
export { router };
