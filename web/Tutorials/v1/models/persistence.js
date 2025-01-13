function consoleMessage() {
  console.log("Die Viewport-Breite beträgt: " + getViewportWidth() + " Pixel.")
}

function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth;
}

class Bild {
  constructor(name, url) {
      this.name = name;
      this.url = url;
  }
}

class Kategorie {
  constructor(name, bild) {
      this.name = name;
      this.bild = bild;
  }
}

class Kapitel {
  constructor(name, beschreibung, dauer) {
      this.name = name;
      this.beschreibung = beschreibung;
      this.dauer = dauer; // Format: "HH:MM"
  }
}

class Tutorial {
  constructor(name, sprache, beschreibung, datum, embedCode) {
      this.name = name;
      this.sprache = sprache;
      this.beschreibung = beschreibung;
      this.datum = datum;
      this.embedCode = embedCode;
      this.dauer = "00:00";
      this.kategorien = [];
      this.kapitelliste = [];
  }

  fuegeKategorieHinzu(kat) {
      this.kategorien.push(kat);
  }

  fuegeKapitelHinzu(kap) {
      this.kapitelliste.push(kap);
  }
}

function getDauerInStundenUndMinuten(dauer) {
  const [hours, minutes] = dauer.split(":").map(Number);
  return `${hours} Std. ${minutes} Min.`;
}

function sortKategorien(kategorien) {
  kategorien.sort((a, b) => a.name.localeCompare(b.name));
}

function getTutorialsZuKategorie(kategorieName, tutorials) {
  return tutorials.filter(tut => tut.kategorien.some(kat => kat.name === kategorieName));
}

const kategorie1 = new Kategorie("Web-Engineering", new Bild("Bild der Kategorie Web-Engineering", "web-eng.jpg"));
const kategorie2 = new Kategorie("Programmierung", new Bild("Bild der Kategorie Programmierung", "prog.jpg"));
const kategorie3 = new Kategorie("Datenbanken", new Bild("Bild der Kategorie Datenbanken", "db.jpg"));
const kategorie4 = new Kategorie("Frontend-Design", new Bild("Bild der Kategorie Frontend-Design", "frontend.jpg"));

const kategorien = [kategorie1, kategorie2, kategorie3, kategorie4];
sortKategorien(kategorien);

const kapitel1 = new Kapitel("Einleitung", "Einleitende Worte zum Thema", "00:10");
const kapitel2 = new Kapitel("Hello World!", "Erstes Testprogramm", "00:20");
const kapitel3 = new Kapitel("Modulsystem", "Erörterung des Modulsystems", "00:30");

const tutorial1 = new Tutorial("Node.js - Der schnelle Einstieg", "DE", "Node.js ist ein JavaScript-Framework ...", new Date(2012, 8, 28), "<iframe ...>");
tutorial1.fuegeKapitelHinzu(kapitel1);
tutorial1.fuegeKapitelHinzu(kapitel2);
tutorial1.fuegeKapitelHinzu(kapitel3);
tutorial1.fuegeKategorieHinzu(kategorie1);

const kapitel4 = new Kapitel("Grundlagen", "Grundlegende Konzepte erklärt", "00:15");
const kapitel5 = new Kapitel("Fortgeschrittene Themen", "Tiefe Einblicke in komplexe Themen", "00:25");

const tutorial2 = new Tutorial("React für Anfänger", "DE", "Ein umfassendes Tutorial für React-Einsteiger ...", new Date(2021, 5, 15), "https://react-tutorial.de");
tutorial2.fuegeKapitelHinzu(kapitel4);
tutorial2.fuegeKapitelHinzu(kapitel5);
tutorial2.fuegeKategorieHinzu(kategorie2);

const tutorials = [tutorial1, tutorial2];

module.exports = {
  kategorien,
  tutorials,
  getDauerInStundenUndMinuten,
  getTutorialsZuKategorie
};