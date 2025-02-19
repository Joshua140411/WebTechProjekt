const express = require('express');
const app = express();
const port = 8844;
const url = require("url");

// Beispiel-Daten für Tutorials
const tutorials = [
  { title: 'Node.js - Einführung', description: 'Lerne Node.js von Grund auf.' },
  { title: 'Mathematik Grundlagen', description: 'Einführung in die Mathematik.' },
  { title: 'JavaScript für Anfänger', description: 'Lerne JavaScript für Anfänger.' },
  { title: 'Fortgeschrittene Mathematik', description: 'Tiefgehende mathematische Konzepte.' },
];

// Middleware um die Daten zu parsen
app.use(express.urlencoded({ extended: true }));

// Route für die Suche
app.get('/search', (req, res) => {
  // Extrahiere den Suchbegriff aus der URL (query-Parameter)
  const queryParams = url.parse(req.url, true).query;
  const searchTerm = queryParams.q || ''; // Falls kein Suchbegriff eingegeben wurde, setze ihn auf ein leeres String
  
  console.log("Suchbegriff:", searchTerm);  // Hier kannst du den Suchbegriff zur Kontrolle ausgeben
  
  // Filtere die Tutorials basierend auf dem Suchbegriff
  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Erstelle die HTML-Seite mit den Suchergebnissen
  let resultHTML = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Suchergebnisse für: ${searchTerm}</title>
      <link rel="stylesheet" href="/Assets/CSS/style.css">  <!-- Achte darauf, dass der Pfad stimmt -->
    </head>
    <body>
      <header>
        <h1>Suchergebnisse für: ${searchTerm}</h1>
      </header>
      <main>
  `;

  // Wenn Treffer gefunden wurden
  if (filteredTutorials.length > 0) {
    resultHTML += '<ul>';
    filteredTutorials.forEach(tutorial => {
      resultHTML += `<li><strong>${tutorial.title}</strong>: ${tutorial.description}</li>`;
    });
    resultHTML += '</ul>';
  } else {
    resultHTML += '<p>Keine Tutorials gefunden.</p>';
  }

  resultHTML += `
      </main>
      <footer>
        <small>&copy; WebTech Tutorial Service</small>
      </footer>
    </body>
    </html>
  `;

  // Gib die HTML-Seite zurück
  res.send(resultHTML);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});



// Neue Route zum Hinzufügen eines Tutorials
app.post('/addTutorial', (req, res) => {
  const { name, browser, categories, description, duration, date, type } = req.body;

  // Neues Tutorial-Objekt erstellen
  const neuesTutorial = {
    title: name,
    description: description,
    language: browser,
    categories: categories.split(',').map(cat => cat.trim()),
    duration: duration,
    date: new Date(date),
    type: type
  };

  // Neues Tutorial zur Liste hinzufügen
  tutorials.push(neuesTutorial);

  console.log('Neues Tutorial hinzugefügt:', neuesTutorial);

  // Weiterleitung zur Kategorienliste
  res.redirect('http://localhost:8844/categories');
});



// Dummy-Route für die Kategorienliste (Beispiel-Rückgabe)
app.get('/categories', (req, res) => {
  let categoriesHTML = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kategorienliste</title>
    </head>
    <body>
      <header>
        <h1>Kategorienliste</h1>
      </header>
      <main>
        <ul>
  `;

  const uniqueCategories = [...new Set(tutorials.flatMap(tut => tut.categories || []))];
  uniqueCategories.forEach(cat => {
    categoriesHTML += `<li>${cat}</li>`;
  });

  categoriesHTML += `
        </ul>
      </main>
      <footer>
        <small>&copy; WebTech Tutorial Service</small>
      </footer>
    </body>
    </html>
  `;

  res.send(categoriesHTML);
});