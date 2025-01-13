const express = require("express");
const router = express.Router();
const http = require("http");
const { kategorien } = require("../models/persistence");
const { tutorials } = require("../models/persistence");
const db = require("../models/persistence");

router.get("/", function (req, res) {
  res.render("list",{
    kategorien: db.kategorien
  });
});

router.get("/list.html", function (req, res) {
  res.render("list",{
    kategorien: db.kategorien
  });
});

router.get("/MatheTutorials.html", function (req, res) {
  let kat = req.query.category;
  let categoryName = kat.name;
  let filteredTutorials = getTutorialsZuKategorie(categoryName, db.tutorials);
  res.render("MatheTutorials", {
    tutorials: filteredTutorials,
    category: categoryName
  });
});

router.get("/Mathe/Mathe1Tutorial1.html", function (req, res) {
  let tutorialName = req.query.name;
  let tutorial = db.tutorials.find(t => t.name === tutorialName);
  if (!tutorial) {
    //TODO
  }
  else{
    res.render("Mathe1Tutorial1", {
      tutorial: tutorial
    });
  }
});

router.get("/form.html", function (req, res) {
  res.render("form");
});

router.post("/form", function (req, res) {
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