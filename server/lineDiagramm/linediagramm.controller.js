// import der Funktion getData von model
import { getData } from "./linediagramm.model.js";

//Hier wird der Paramenter aktuelleGemeinde vom Frontend geholt und der funktion getData übergeben
async function getLineData(req, res) {
  const selectedGemeinde = req.body.aktuelleGemeinde;
  const results = await getData(selectedGemeinde);
  res.json(results);
}
// funktion wird exportiert
export { getLineData };
