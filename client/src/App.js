import "./css/App.css";
import React, { useEffect, useState, useRef } from "react";
import Axios, { all } from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Map from "./libs/maps/map";
import Combogemeinden from "./libs/gemeinden";
import Combojahre from "./libs/jahre";

Chart.register(CategoryScale);

function App() {
  const [selectedGemeinde, setSelectedGemeinde] = useState("Frauenfeld");
  const [selectedGemeinde2, setSelectedGemeinde2] = useState("Frauenfeld");
  const [selectedYear, setSelectedYear] = useState("2022");
  const [selectedYear2, setSelectedYear2] = useState("2022");
  const [gemeindenData, setGemeindenData] = useState({});
  const [natIta, setNatIta] = useState([]);
  const [natPo, setNatPo] = useState([]);
  const [natDe, setNatDe] = useState([]);
  const [natMaz, setNatMaz] = useState([]);
  const [natSons, setNatSons] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [pieData2, setPieData2] = useState([]);

  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  let arrCurrentGemeinde = [];
  let arrPortugal = [];
  let arrItalien = [];
  let arrMazedonien = [];
  let arrDeutschland = [];
  let arrSonstige = [];
  const arrPortugal2 = ["", "", "", "", "", "", "", ""];
  const arrItalien2 = ["", "", "", "", "", "", "", ""];
  const arrMazedonien2 = ["", "", "", "", "", "", "", ""];
  const arrDeutschland2 = new Array(8).fill(0);
  let test = 1;
  const arrSonstige2 = ["", "", "", "", "", "", "", ""];
  let allIds = [];
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataLoaded2, setDataLoaded2] = useState(false);
  const [dataLoaded3, setDataLoaded3] = useState(false);
  const [dataLoaded4, setDataLoaded4] = useState(false);

  // Hier werden die Infos für das 1. Pie diagramm geholt
  function getPieData(jahr) {
    Axios.post("http://localhost:3001/api/pieDiagram", {
      gewolltesJahr: jahr,
      gewollteGemeinde: "Kreuzlingen",
    }).then((response) => {
      setPieData(response.data);
      setDataLoaded(true);
    });
  }

  // Hier werden die Infos für das 2. Pie diagramm geholt
  function getPieData2(jahr, gemeinde) {
    Axios.post("http://localhost:3001/api/pieDiagram", {
      gewolltesJahr: jahr,
      gewollteGemeinde: gemeinde,
    }).then((response) => {
      setPieData2(response.data);
      setDataLoaded3(true);
    });
  }

  // HIer werden die Infos für das Liniendiagram mgeholt
  async function getLineData(gemeinde) {
    await Axios.post("http://localhost:3001/api/linienDiagram", {
      aktuelleGemeinde: gemeinde,
    }).then((response) => {
      setNatDe(response.data[0].deutschland);
      setNatIta(response.data[0].italien);
      setNatPo(response.data[0].portugal);
      setNatMaz(response.data[0].mazedonien);
      setNatSons(response.data[0].sonstige);

      setTimeout(() => {
        setDataLoaded2(true);
      }, 1000);
    });
  }

  // Hier werden die Infos für die Karte geholt
  const getInfos = () => {
    Axios.post("http://localhost:3001/api/karte", {
      gewolltesJahr: selectedYear,
    }).then((response) => {
      for (let i in allIds) {
        let currentId = allIds[i];

        arrCurrentGemeinde.push(response.data[currentId].name);

        if (response.data[currentId].portugal !== undefined) {
          arrPortugal.push(response.data[currentId].portugal);
        } else {
          arrPortugal.push(0);
        }
        if (response.data[currentId].italien !== undefined) {
          arrItalien.push(response.data[currentId].italien);
        } else {
          arrItalien.push(0);
        }
        if (response.data[currentId].mazedonien !== undefined) {
          arrMazedonien.push(response.data[currentId].mazedonien);
        } else {
          arrMazedonien.push(0);
        }
        if (response.data[currentId].deutschland !== undefined) {
          arrDeutschland.push(response.data[currentId].deutschland);
        } else {
          arrDeutschland.push(0);
        }
        if (response.data[currentId].sonstige !== undefined) {
          arrSonstige.push(response.data[currentId].sonstige);
        } else {
          arrSonstige.push(0);
        }
      }
    });
  };

  // hier werden die Tiptools gemacht, und ihnen der Passende Inhalt zugewiesen.
  useEffect(() => {
    const bezirke = document.querySelectorAll("#municipalities path");
    let tooltip = document.getElementById("tooltip-map");

    for (let e = 0; e < bezirke.length; e++) {
      allIds.push(bezirke[e].id);
    }
    getInfos();
    for (let e = 1; e < bezirke.length; e++) {
      bezirke[e].addEventListener("mouseover", (event) => {
        tooltip.classList.remove("do-not-display");

        tooltip.innerText = `${arrCurrentGemeinde[e]} \r\n Deutsche: ${arrDeutschland[e]} \r\n Portugiesen: ${arrPortugal[e]} \r\n Italiener: ${arrItalien[e]} \r\n Mazedonier: ${arrMazedonien[e]} \r\n Sonstige: ${arrSonstige[e]}`;

        tooltip.style.top = `${event.pageY}px`;
        tooltip.style.left = `${event.pageX}px`;
      });
      bezirke[e].addEventListener("mouseout", (event) => {
        tooltip.classList.add("do-not-display");
      });
    }
  }, [selectedYear, dataLoaded4]);

  // sobald beim Dropdown etwas ausgewählt wird, verändert sich der UseState
  const changeGemeinde = (event) => {
    setSelectedGemeinde(event.target.value);
    setDataLoaded2(false);
    getLineData(event.target.value);
  };

  // sobald beim Dropdown etwas ausgewählt wird, verändert sich der UseState
  const changeGemeinde2 = (event) => {
    setSelectedGemeinde2(event.target.value);
    setDataLoaded(false);
    setDataLoaded3(false);
    getPieData(selectedYear2, event.target.value);
    getPieData2(selectedYear2, event.target.value);
  };

  // sobald beim Dropdown etwas ausgewählt wird, verändert sich der UseState
  const changeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  // sobald beim Dropdown etwas ausgewählt wird, verändert sich der UseState
  const changeYear2 = (event) => {
    setSelectedYear2(event.target.value);
    setDataLoaded(false);
    setDataLoaded3(false);
    getPieData(event.target.value, selectedGemeinde2);
    getPieData2(event.target.value, selectedGemeinde2);
  };

  // Hier werden die Daten für das erste Piechart verarbeitet
  useEffect(() => {
    const ctx = document.getElementById("pieChart");

    // Falls ein Liniendiagramm besteht und dieser UseEffekt nochamls aufgerufen wird, wird der Vorherige Chart entfernt
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // hier wird das Chart erstellt
    if (pieData.length > 0) {
      chartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: [
            "Deutschland",
            "Portugal",
            "Italien",
            "Mazedonien",
            "Sonstige",
          ],
          datasets: [
            {
              label: "Anzahl Einwohner",
              data: [
                pieData[0].deutschland,
                pieData[0].portugal,
                pieData[0].italien,
                pieData[0].mazedonien,
                pieData[0].sonstige,
              ],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(80, 130, 255)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(200, 50, 255)",
              ],
              hoverOffset: 5,
              borderWidth: 2,
              borderColor: "black",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 18,
                  family: "sans-serif",
                  style: "normal",
                },
              },
            },
          },
        },
      });
    }
  }, [dataLoaded]);

  // UseEffekt um Liniendiagramm zu erstellen
  useEffect(() => {
    const ctx = document.getElementById("lineChart");

    // Falls ein Liniendiagramm besteht und dieser UseEffekt nochamls aufgerufen wird, wird der Vorherige Chart entfernt
    if (chartRef2.current) {
      chartRef2.current.destroy();
    }

    // generieren des Charts

    chartRef2.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        datasets: [
          {
            label: "Anzahl Deutsche:",
            data: [
              natDe.jahr1,
              natDe.jahr2,
              natDe.jahr3,
              natDe.jahr4,
              natDe.jahr5,
              natDe.jahr6,
              natDe.jahr7,
              natDe.jahr8,
            ],

            backgroundColor: ["rgba(75,192,192,1)"],
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
          },
          {
            label: "Anzahl Italiener:",
            data: [
              natIta.jahr1,
              natIta.jahr2,
              natIta.jahr3,
              natIta.jahr4,
              natIta.jahr5,
              natIta.jahr6,
              natIta.jahr7,
              natIta.jahr8,
            ],
            backgroundColor: ["rgba(255,0,0,1)"],
            borderColor: "rgba(255,0,0,1)",
            borderWidth: 2,
          },
          {
            label: "Anzahl Portugiesen:",
            data: [
              natPo.jahr1,
              natPo.jahr2,
              natPo.jahr3,
              natPo.jahr4,
              natPo.jahr5,
              natPo.jahr6,
              natPo.jahr7,
              natPo.jahr8,
            ],
            backgroundColor: ["rgb(80, 130, 255)"],
            borderColor: "rgb(80, 130, 255)",
            borderWidth: 2,
          },
          {
            label: "Anzahl Mazedonier:",
            data: [
              natMaz.jahr1,
              natMaz.jahr2,
              natMaz.jahr3,
              natMaz.jahr4,
              natMaz.jahr5,
              natMaz.jahr6,
              natMaz.jahr7,
              natMaz.jahr8,
            ],
            backgroundColor: ["rgb(255, 205, 86)"],
            borderColor: "rgb(255, 205, 86)",
            borderWidth: 2,
          },
          {
            label: "Anzahl Sonstige Bürger:",
            data: [
              natSons.jahr1,
              natSons.jahr2,
              natSons.jahr3,
              natSons.jahr4,
              natSons.jahr5,
              natSons.jahr6,
              natSons.jahr7,
              natSons.jahr8,
            ],
            backgroundColor: ["rgb(200, 100, 255)"],
            borderColor: "rgb(200, 100, 255)",
            borderWidth: 2,
          },
        ],
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      },
    });
  }, [dataLoaded2]);

  // useEffect um den vergleichs pie zu erstellen
  useEffect(() => {
    const ctx = document.getElementById("pieChart2");
    // Falls ein PieDiagram besteht und dieser UseEffekt nochamls aufgerufen wird, wird der Vorherige Chart entfernt
    if (chartRef3.current) {
      chartRef3.current.destroy();
    }
    if (pieData2.length > 0) {
      chartRef3.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: [
            "Deutschland",
            "Portugal",
            "Italien",
            "Mazedonien",
            "Sonstige",
          ],
          datasets: [
            {
              label: "Anzahl Einwohner",
              data: [
                pieData2[0].deutschland,
                pieData2[0].portugal,
                pieData2[0].italien,
                pieData2[0].mazedonien,
                pieData2[0].sonstige,
              ],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(80, 130, 255)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(200, 50, 255)",
              ],
              hoverOffset: 5,
              borderWidth: 2,
              borderColor: "black",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 18,
                  family: "sans-serif",
                  style: "normal",
                },
              },
            },
          },
        },
      });
    }
  }, [dataLoaded3]);

  // Wenn die Webseite geladen wird, werden die folgenden Funktionen ausgeführt
  window.onload = () => {
    getInfos();
    getLineData(selectedGemeinde);
    getPieData(selectedYear);
    getPieData2(selectedYear2, selectedGemeinde2);
  };

  // Das ist der Body und das was man effektiv auf der Webseite sieht
  return (
    <div className="App">
      <header>
        <div className="title">
          <em className="titleText">Ausländeranteil im Kanton Thurgau</em>
        </div>
      </header>
      <div className="Content">
        <div className="infos">
          <p className="pbody">
            Die folgende Webseite dient als Darstellung des Ausländeranteils der
            einzelnen Gemeinden im Kanton Thurgau. Wir beziehen dabei die Daten
            von der Webseite{" "}
            <a
              href="https://opendata.swiss/de"
              target="_blank"
              rel="noopener noreferrer"
            >
              opendata.swiss
            </a>{" "}
            welches eine komplett kostenfreie Webseite ist, die zuverlässige und
            korrekte Daten bereitstellt. Zum Teil ist die Nationalität nicht
            bekannt gewesen, was zur Folge hatte, dass die Unbekannten als
            Sonstige gekennzeichnet werden.
          </p>
          <p className="pbody">
            Diese Webseite ist ein Projekt von Bleron Regja und Yanis Bülow im
            Zuge der Programmierwoche 2023 an der Kantonschule Frauenfeld.
          </p>
          <p className="pbody">
            Verschaffen sie sich einen Überblick über die verschiedenen
            Nationalitäten im Kanton Thurgau
          </p>
          <div className="links">
            <p className="link">
              <a href="#absatz1">Zu Karte des Kanton Thurgaus Springen</a>
            </p>
            <p className="link">
              <a href="#absatz2">
                Zu Vergleich zur Gemeinde Kreuzlingen springen
              </a>
            </p>
            <p className="link">
              <a href="#absatz3">
                Zu Entwicklung der Nationalitäten in der Gemeinde springen
              </a>
            </p>
          </div>
        </div>

        <br></br>
        <div className="absatz1-div">
          <h1 id="absatz1">Karte des Kantons Thurgau</h1>
          <p className="pbody1">
            Finden Sie heraus, welche und wie viel verschiedene Nationalitäten
            in ihrer Gemeinde leben!
          </p>
          <br></br>
          <select className="combo1" onChange={changeYear}>
            <Combojahre />
          </select>
          <Map className="map" />
          <p id="tooltip-map" className="do-not-display tooltip"></p>
        </div>
        <div className="absatz2-div">
          <h1 id="absatz2">Vergleich zur Gemeinde Kreuzlingen.</h1>
          <p className="pbody1">
            Hier können Sie ihre Gemeinde aussuchen und sie mit dem
            Kreisdiagramm rechts von Kreuzlingen vergleichen. Dabei können sie
            auch das Jahr anpassen.
          </p>
          <br></br>
          <br></br>
          <div className="comboBoxes">
            <select className="combo" onChange={changeGemeinde2}>
              <Combogemeinden />
            </select>
            <select className="combo" onChange={changeYear2}>
              <Combojahre />
            </select>
          </div>

          <div className="charts">
            <div className="pieChart">
              <h1>{selectedGemeinde2}</h1>
              <canvas id="pieChart2" className="chart2"></canvas>
            </div>
            <div className="pieChart">
              <h1>Kreuzlingen</h1>
              <canvas id="pieChart"></canvas>
            </div>
          </div>
        </div>
        <div className="absatz3-div">
          <br></br>
          <h1 id="absatz3">Entwicklung der Nationalitäten in der Gemeinde</h1>
          <p className="pbody1">
            Finden sie heraus, wie sich die verschiedenen Nationalitäten in
            ihrer Gemeinde entwickelt haben.
          </p>
          <br></br>
          <select className="combo" onChange={changeGemeinde}>
            <Combogemeinden />
          </select>
          <br></br>
          <br></br>
          <h1>{selectedGemeinde}</h1>
          <div className="charts">
            <canvas id="lineChart"></canvas>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <footer>
        <div className="footercontainer">
          <a
            href="https://github.com/y4nisb"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yanis Bülow
          </a>
          <a
            href="https://github.com/DerFliegendeHollaender?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bleron Regja
          </a>
        </div>
        <p className="para2">Kantonschule Frauenfeld</p>
      </footer>
      <script src="/main.js"></script>
    </div>
  );
}

export default App;
