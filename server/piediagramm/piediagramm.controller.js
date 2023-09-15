// import der funktion getData von model
import { getData } from "./piediagramm.model.js";

// hier werden die Parameter der funktion übegeben und vom Frontend geholt
async function getPieData(req, res) {
  const selectedGemeinde = req.body.gewollteGemeinde;
  const selectedYear = req.body.gewolltesJahr;

  const results = await getData(selectedYear, selectedGemeinde);
  res.json(results);
}
//export der funktion
export { getPieData };
