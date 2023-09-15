import axios from "axios";
// hier wird eine Konstante für alle Gemeinden erstellt die noch leer ist
const alleGemeinden = [];
// hier wird eine Konstante für alle Daten erstellt die noch leer ist
const alleDaten = [];

//hier wird von der API eine abfrage via axios gemacht und alle Daten in den zuvor definierten
// array alleDaten übernommen
function getAll() {
  axios
    .get(
      "https://data.tg.ch/api/records/1.0/search/?dataset=sk-stat-60&q=&rows=10000"
    )
    .then((response) => {
      for (let i = 0; i < response.data.records.length; i++) {
        alleDaten.push(response.data.records[i]);
      }
      return Promise.resolve(alleDaten);
    });
}
// hier wird nun für ein Jahr welches man im Frontend definiert von allenDaten ein Array zurückgegeben,
// der nur die Informatione über das Jahr enthält
//fals das Jahr nicht gegeben ist wird der Array mit Daten die die Id die man möchte beinhaltet gefüllt
function getData(year) {
  for (let i = 0; i < alleDaten.length; i++) {
    const gewollteId = alleDaten[i].fields.bfs_nr_gemeinde;
    const newGemeinde = alleDaten[i].fields.gemeinde_name;
    const gemeindeJahr = alleDaten[i].fields.jahr;

    if (year === gemeindeJahr) {
      if (alleGemeinden.hasOwnProperty(gewollteId)) {
        const staatsangehoerigkeit =
          alleDaten[i].fields.staatsangehoerigkeit_bezeichnung;
        const anzahlPersonen = alleDaten[i].fields.anzahl_personen;

        if (staatsangehoerigkeit === "Italien") {
          alleGemeinden[gewollteId].italien = anzahlPersonen;
        } else if (staatsangehoerigkeit === "Portugal") {
          alleGemeinden[gewollteId].portugal = anzahlPersonen;
        } else if (staatsangehoerigkeit === "Deutschland") {
          alleGemeinden[gewollteId].deutschland = anzahlPersonen;
        } else if (staatsangehoerigkeit === "Mazedonien") {
          alleGemeinden[gewollteId].mazedonien = anzahlPersonen;
        } else if (
          staatsangehoerigkeit ===
          "Sonstige (inkl. ausl\u00e4ndische Staatsangeh\u00f6rigkeit unbekannt)"
        ) {
          alleGemeinden[gewollteId].sonstige = anzahlPersonen;
        }
      } else {
        const gemeinde = {
          name: newGemeinde,
          deutschland: "0",
          italien: "0",
          portugal: "0",
          mazedonien: "0",
          sonstige: "0",
        };
        const staatsangehoerigkeit =
          alleDaten[i].fields.staatsangehoerigkeit_bezeichnung;
        const anzahlPersonen = alleDaten[i].fields.anzahl_personen;

        if (staatsangehoerigkeit === "Italien") {
          gemeinde.italien = anzahlPersonen;
        } else if (staatsangehoerigkeit === "Portugal") {
          gemeinde.portugal = anzahlPersonen;
        } else if (staatsangehoerigkeit === "Deutschland") {
          gemeinde.deutschland = anzahlPersonen;
        } else if (staatsangehoerigkeit === "Mazedonien") {
          gemeinde.mazedonien = anzahlPersonen;
        } else if (
          staatsangehoerigkeit ===
          "Sonstige (inkl. ausl\u00e4ndische Staatsangeh\u00f6rigkeit unbekannt)"
        ) {
          gemeinde.sonstige = anzahlPersonen;
        }

        alleGemeinden[gewollteId] = gemeinde;
      }
    }
  }
  return Promise.resolve(alleGemeinden);
}
//hier werden die functionen exportiert
export { getAll, getData };
