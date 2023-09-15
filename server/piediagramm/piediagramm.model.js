// import von axios
import axios, { all } from "axios";
// definition leere Konstante alleDaten
const alleDaten = [];
// erstellen leere Konstante infoGemeinde
const infoGemeinde = [];
// hier werden alle daten von der API geholt und in den leeren Array alleDaten geschrieben
function getAllPieData() {
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
// hier werden nun die Informationen für den gebrauch gefiltert, in dem Fall nach Jahr und Gemeinde
function getData(jahr, gemeinde) {
  let aktuelleId = 1;

  for (let i = 0; i < alleDaten.length; i++) {
    const newGemeinde = alleDaten[i].fields.gemeinde_name;
    const staatsangehoerigkeit =
      alleDaten[i].fields.staatsangehoerigkeit_bezeichnung;
    const gemeindeJahr = alleDaten[i].fields.jahr;
    const gesammtEinwohner = alleDaten[i].fields.anzahl_personen;

    if (newGemeinde === gemeinde) {
      if (jahr === gemeindeJahr) {
        if (infoGemeinde[0] !== undefined) {
          if (staatsangehoerigkeit === "Deutschland") {
            infoGemeinde[0].deutschland = gesammtEinwohner;
          } else if (staatsangehoerigkeit === "Italien") {
            infoGemeinde[0].italien = gesammtEinwohner;
          } else if (staatsangehoerigkeit === "Portugal") {
            infoGemeinde[0].portugal = gesammtEinwohner;
          } else if (staatsangehoerigkeit === "Mazedonien") {
            infoGemeinde[0].mazedonien = gesammtEinwohner;
          } else if (
            staatsangehoerigkeit ===
            "Sonstige (inkl. ausl\u00e4ndische Staatsangeh\u00f6rigkeit unbekannt)"
          ) {
            infoGemeinde[0].sonstige = gesammtEinwohner;
          }
        } else {
          const gemeinde = {
            id: aktuelleId,
            deutschland: "0",
            italien: "0",
            portugal: "0",
            mazedonien: "0",
            sonstige: "0",
          };
          if (staatsangehoerigkeit === "Deutschland") {
            gemeinde.deutschland = gesammtEinwohner;
          } else if (staatsangehoerigkeit === "Italien") {
            gemeinde.italien = gesammtEinwohner;
          } else if (staatsangehoerigkeit === "Portugal") {
            gemeinde.portugal = gesammtEinwohner;
          } else if (staatsangehoerigkeit === "Mazedonien") {
            gemeinde.mazedonien = gesammtEinwohner;
          } else if (
            staatsangehoerigkeit ===
            "Sonstige (inkl. ausl\u00e4ndische Staatsangeh\u00f6rigkeit unbekannt)"
          ) {
            gemeinde.sonstige = gesammtEinwohner;
          }
          infoGemeinde.push(gemeinde);
          aktuelleId++;
        }
      }
    }
  }
  return Promise.resolve(infoGemeinde);
}
// export der Funktionen
export { getAllPieData, getData };
