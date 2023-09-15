// import von axios
import axios from "axios";
// erstellen einer leeren konstante alleDaten
const alleDaten = [];
// erstellen einer leeren konstante alleGemeinden
const alleGemeinden = [];

// hier werden von der API alle daten geholt und in den Array alleDaten geschrieben
function getAllLineData() {
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
// hier wird nun für die Gemeinde die man im Frontend definiert gefiltert und die passenden Informationen
// in den leeren Array alleGemeinden geschrieben
function getData(gemeinde) {
  const gewollteGemeinde = gemeinde;
  for (let i = 0; i < alleDaten.length; i++) {
    const gemeindeJahr = alleDaten[i].fields.jahr;
    const selectedGemeinde = alleDaten[i].fields.gemeinde_name;
    const selectedNationalitaet =
      alleDaten[i].fields.staatsangehoerigkeit_bezeichnung;
    const anzahlPersonen = alleDaten[i].fields.anzahl_personen;
    if (gewollteGemeinde === selectedGemeinde) {
      if (alleGemeinden[0] !== undefined) {
        if ("Deutschland" === selectedNationalitaet) {
          if (gemeindeJahr === "2015") {
            alleGemeinden[0].deutschland.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            alleGemeinden[0].deutschland.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            alleGemeinden[0].deutschland.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            alleGemeinden[0].deutschland.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            alleGemeinden[0].deutschland.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            alleGemeinden[0].deutschland.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            alleGemeinden[0].deutschland.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            alleGemeinden[0].deutschland.jahr8 = anzahlPersonen;
          }
        } else if ("Italien" === selectedNationalitaet) {
          if (gemeindeJahr === "2015") {
            alleGemeinden[0].italien.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            alleGemeinden[0].italien.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            alleGemeinden[0].italien.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            alleGemeinden[0].italien.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            alleGemeinden[0].italien.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            alleGemeinden[0].italien.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            alleGemeinden[0].italien.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            alleGemeinden[0].italien.jahr8 = anzahlPersonen;
          }
        } else if ("Portugal" === selectedNationalitaet) {
          if (gemeindeJahr === "2015") {
            alleGemeinden[0].portugal.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            alleGemeinden[0].portugal.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            alleGemeinden[0].portugal.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            alleGemeinden[0].portugal.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            alleGemeinden[0].portugal.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            alleGemeinden[0].portugal.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            alleGemeinden[0].portugal.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            alleGemeinden[0].portugal.jahr8 = anzahlPersonen;
          }
        } else if ("Mazedonien" === selectedNationalitaet) {
          if (gemeindeJahr === "2015") {
            alleGemeinden[0].mazedonien.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            alleGemeinden[0].mazedonien.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            alleGemeinden[0].mazedonien.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            alleGemeinden[0].mazedonien.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            alleGemeinden[0].mazedonien.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            alleGemeinden[0].mazedonien.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            alleGemeinden[0].mazedonien.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            alleGemeinden[0].mazedonien.jahr8 = anzahlPersonen;
          }
        } else if (
          "Sonstige (inkl. ausl\u00e4ndische Staatsangeh\u00f6rigkeit unbekannt)" ===
          selectedNationalitaet
        ) {
          if (gemeindeJahr === "2015") {
            alleGemeinden[0].sonstige.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            alleGemeinden[0].sonstige.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            alleGemeinden[0].sonstige.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            alleGemeinden[0].sonstige.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            alleGemeinden[0].sonstige.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            alleGemeinden[0].sonstige.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            alleGemeinden[0].sonstige.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            alleGemeinden[0].sonstige.jahr8 = anzahlPersonen;
          }
        }
      } else {
        // falls etwas nicht definiert ist oder nicht klappt ist der wert nicht undefined sondern 0
        const gemeinde = {
          deutschland: {
            jahr1: "0",
            jahr2: "0",
            jahr3: "0",
            jahr4: "0",
            jahr5: "0",
            jahr6: "0",
            jahr7: "0",
            jahr8: "0",
          },
          italien: {
            jahr1: "0",
            jahr2: "0",
            jahr3: "0",
            jahr4: "0",
            jahr5: "0",
            jahr6: "0",
            jahr7: "0",
            jahr8: "0",
          },
          portugal: {
            jahr1: "0",
            jahr2: "0",
            jahr3: "0",
            jahr4: "0",
            jahr5: "0",
            jahr6: "0",
            jahr7: "0",
            jahr8: "0",
          },
          mazedonien: {
            jahr1: "0",
            jahr2: "0",
            jahr3: "0",
            jahr4: "0",
            jahr5: "0",
            jahr6: "0",
            jahr7: "0",
            jahr8: "0",
          },
          sonstige: {
            jahr1: "0",
            jahr2: "0",
            jahr3: "0",
            jahr4: "0",
            jahr5: "0",
            jahr6: "0",
            jahr7: "0",
            jahr8: "0",
          },
        };
        if ("Deutschland" === selectedNationalitaet) {
          if (gemeindeJahr === "2015") {
            gemeinde.deutschland.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            gemeinde.deutschland.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            gemeinde.deutschland.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            gemeinde.deutschland.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            gemeinde.deutschland.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            gemeinde.deutschland.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            gemeinde.deutschland.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            gemeinde.deutschland.jahr8 = anzahlPersonen;
          }
        } else if ("Italien" === selectedNationalitaet) {
          if (gemeindeJahr === "2015") {
            gemeinde.italien.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            gemeinde.italien.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            gemeinde.italien.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            gemeinde.italien.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            gemeinde.italien.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            gemeinde.italien.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            gemeinde.italien.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            gemeinde.italien.jahr8 = anzahlPersonen;
          }
        } else if ("Portugal" === selectedNationalitaet) {
          if (gemeindeJahr === "2015") {
            gemeinde.portugal.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            gemeinde.portugal.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            gemeinde.portugal.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            gemeinde.portugal.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            gemeinde.portugal.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            gemeinde.portugal.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            gemeinde.portugal.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            gemeinde.portugal.jahr8 = anzahlPersonen;
          }
        } else if ("Mazedonien" === selectedNationalitaet) {
          if (gemeindeJahr === "2015") {
            gemeinde.mazedonien.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            gemeinde.mazedonien.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            gemeinde.mazedonien.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            gemeinde.mazedonien.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            gemeinde.mazedonien.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            gemeinde.mazedonien.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            gemeinde.mazedonien.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            gemeinde.mazedonien.jahr8 = anzahlPersonen;
          }
        } else if (
          "Sonstige (inkl. ausl\u00e4ndische Staatsangeh\u00f6rigkeit unbekannt)" ===
          selectedNationalitaet
        ) {
          if (gemeindeJahr === "2015") {
            gemeinde.sonstige.jahr1 = anzahlPersonen;
          } else if (gemeindeJahr === "2016") {
            gemeinde.sonstige.jahr2 = anzahlPersonen;
          } else if (gemeindeJahr === "2017") {
            gemeinde.sonstige.jahr3 = anzahlPersonen;
          } else if (gemeindeJahr === "2018") {
            gemeinde.sonstige.jahr4 = anzahlPersonen;
          } else if (gemeindeJahr === "2019") {
            gemeinde.sonstige.jahr5 = anzahlPersonen;
          } else if (gemeindeJahr === "2020") {
            gemeinde.sonstige.jahr6 = anzahlPersonen;
          } else if (gemeindeJahr === "2021") {
            gemeinde.sonstige.jahr7 = anzahlPersonen;
          } else if (gemeindeJahr === "2022") {
            gemeinde.sonstige.jahr8 = anzahlPersonen;
          }
        }
        alleGemeinden.push(gemeinde);
      }
    }
  }
  return Promise.resolve(alleGemeinden);
}
// export der funktionen
export { getAllLineData, getData };
