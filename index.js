import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config(); // Laddar in .env automatiskt så process.env fungerar
const app = express(); // Skapar servern

// Middleware, funktioner som körs innan routes
app.use(cors()); // Gör det möjligt för en frontend på en annan port att anropa API:et
app.use(express.json()); // Gör att Express kan läsa JSON och lägga det i req.body

// In-memory data
let directors = [
  { id: 1, name: "Christopher Nolan" },
  { id: 2, name: "Greta Gerwig" },
  { id: 3, name: "Quentin Tarantino" },
];

// Endpoint som visar att servern kör och kan svara
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

// Returnerar hela listan med regissörer
app.get("/api/directors", (req, res) => {
  res.json(directors);
});

// Returnera rätt objekt i arrayen
app.get("/api/directors/:id", (req, res) => {
  const id = Number(req.params.id);
  const director = directors.find((d) => d.id === id);

  if (!director) {
    return res.status(404).json({
      error: "Director not found",
    });

    res.json(director);
  }
});

// Lägger till ett nytt objekt i arrayen
app.post("/api/directors", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const lastId = directors.length > 0 ? directors[directors.length - 1].id : 0;
  const newDirector = { id: lastId + 1, name };

  directors.push(newDirector);

  res.status(201).json(newDirector);
});

// Startar servern
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
