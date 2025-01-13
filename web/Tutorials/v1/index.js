// index.js

const http = require("http");
const url = require("url");
const { tutorials, getTutorialsZuKategorie } = require("./models/persistence.js");

const hostname = "localhost";
const port = 8844;

// Funktion, um HTML für Suchergebnisse zu generieren
function generateHTML(title, results) {
    const listItems = results.map(item => `<li>${item.name}</li>`).join("");
    const content = results.length > 0
        ? `<h1>Tutorials mit: ${title}</h1><ul>${listItems}</ul>`
        : `<h1>Keine Tutorials gefunden für: ${title}</h1>`;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Suchergebnisse</title>
        <link rel="stylesheet" href="/v0/Tutorials/Assets/CSS/style.css">
    </head>
    <body>
        <header>
            <h1>WebTech Suche</h1>
        </header>
        <main>${content}</main>
        <footer>
            <p>&copy; 2025 WebTech Projekt</p>
        </footer>
    </body>
    </html>`;
}

// Server erstellen
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const searchTerm = query.q;

    if (parsedUrl.pathname === "/search" && searchTerm) {
        // Tutorials nach Suchbegriff filtern
        const results = tutorials.filter(tutorial =>
            tutorial.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // HTML-Seite mit Suchergebnissen generieren
        const html = generateHTML(searchTerm, results);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(html);
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("404 Not Found");
    }
});

// Server starten
server.listen(port, hostname, () => {
    console.log(`Server läuft unter http://${hostname}:${port}/`);
});