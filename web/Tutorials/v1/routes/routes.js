const express = require("express");
const router = express.Router();
// [TODO]
// Weitere benoetigte Module einbinden
const http = require("http");
const { kategorien } = require("../models/persistence");
const { tutorials } = require("../models/persistence");
const db = require("../models/persistence");

router.get("/", function (req, res) {
  // [TODO]
  // Implementieren: Liste der Kategorien anzeigen
  res.render("index",{
    kategorien: db.kategorien
  });
});

router.get("/tutorials", function (req, res) {
  // [TODO]
  // Implementieren: Tutorials zur gegebenen Kategorie anzeigen
  // (Kategorie als Anfrage/Query-Parameter gegeben,
  // Zugriff erfolgt mit: req.query.category)
  let kat = req.query.category;
  let categoryName = kat.name;
  let filteredTutorials = getTutorialsZuKategorie(categoryName, db.tutorials);
  res.render("tutorials", {
    tutorials: filteredTutorials, // Pass the filtered tutorials to the view
    category: categoryName        // Pass the category name for display
  });
});

router.get("/tutorial", function (req, res) {
  // [TODO]
  // Implementieren: Details zum Tutorial mit gegebenem Namen anzeigen
  // (Name als Anfrage/Query-Parameter gegeben,
  // Zugriff erfolgt mit: req.query.name)
  let tutorialName = req.query.name;
  let tutorial = db.tutorials.find(t => t.name === tutorialName);

  if (!tutorial) {
    next();
  }
  else{
    res.render("tutorial", {
      tutorial: tutorial
    });
  }
});

router.get("/form", function (req, res) {
  // [TODO]
  // Implementieren: Formular zum Hinzufügen eines neuen Tutorials anzeigen
  res.render("form");
});

router.post("/form", function (req, res) {
  // [TODO]
  // Implementieren: Hinzufügen eines neuen Tutorials, danach Weiterleitung nach "/"
  let body = req.body;
  let newTutorial = {
    name: body.name,
    description: body.description,
    category: body.category
  };
  db.tutorials.push(newTutorial); 
  newTutorial.fuegeKategorieHinzu(db.kategorien.find(k => k.name === newTutorial.name))
  res.redirect("/");
});

module.exports = router;