const express = require("express");
const app = express();
const router = require("./routes/routes.js");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(router);

app.get('*', function(req, res){
    res.status(404).render("Fehlerseite",{
      url: req.url
    });
  });

app.listen(8020, function(){
    console.log("Server läuft auf: http://localhost:8020")
});