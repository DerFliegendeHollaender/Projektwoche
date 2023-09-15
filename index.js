// hier werden die ganzen router importiert
import express from "express";
import { router as karteRouter } from "./server/karte/karte.routes.js";
import { router as linienRouter } from "./server/lineDiagramm/linediagramm.routes.js";
import { router as pieRouter } from "./server/piediagramm/piediagramm.routes.js";
import cors from "cors";
import { getAll } from "./server/karte/karte.model.js";
import { getAllLineData } from "./server/lineDiagramm/linediagramm.model.js";
import { getAllPieData } from "./server/piediagramm/piediagramm.model.js";

const app = express();

app.use(express.static("client"));
app.use(cors());

// hier werden die Schnittstellen definiert
app.use(express.json());
app.use("/api/karte", karteRouter);

app.use("/api/linienDiagram", linienRouter);

app.use("/api/pieDiagram", pieRouter);

getAll();
getAllLineData();
getAllPieData();

// hier wird der Port des Backends definiert
app.listen(3001, () => {
  console.log("Server is Running");
});
