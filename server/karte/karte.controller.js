// import der funktionen von model
import { getData } from "./karte.model.js";

// hier kann man nun die funktion von model aufrufen und das Jahr vom Frontend holden und die funktion
// mit dem gewünchten Jahr abfragen
async function getKarteData(req, res) {
  const selectedYear = req.body.gewolltesJahr;

  const results = await getData(selectedYear);

  res.json(results);
}
// export der funktion
export { getKarteData };
