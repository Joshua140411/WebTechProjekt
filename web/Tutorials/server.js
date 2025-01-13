const express = require('express');
const app = express();
const port = 8844;
const url = require("url");
const tutorials = [
  { title: 'Node.js - Einführung', description: 'Lerne Node.js von Grund auf.' },
  { title: 'Mathematik Grundlagen', description: 'Einführung in die Mathematik.' },
  { title: 'JavaScript für Anfänger', description: 'Lerne JavaScript für Anfänger.' },
  { title: 'Fortgeschrittene Mathematik', description: 'Tiefgehende mathematische Konzepte.' },
];

app.use(express.urlencoded({ extended: true }));
app.get('/search', (req, res) => {

  const queryParams = url.parse(req.url, true).query;
  const searchTerm = queryParams.q || '';
  
  console.log("Suchbegriff:", searchTerm);
  

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  res.send(resultHTML);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});