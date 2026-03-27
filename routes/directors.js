import { Router } from "express";

const router = Router();

// In-memory data
let directors = [
  { id: 1, name: "Christopher Nolan" },
  { id: 2, name: "Greta Gerwig" },
  { id: 3, name: "Quentin Tarantino" },
];

// Returnerar hela listan med regissörer
router.get("/", (req, res) => {
  res.json(directors);
});

// Returnera rätt objekt i arrayen
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const director = directors.find((d) => d.id === id);

  if (!director) {
    return res.status(404).json({
      error: "Director not found",
    });
  }

  res.json(director);
});

// Lägger till ett nytt objekt i arrayen
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const lastId = directors.length > 0 ? directors[directors.length - 1].id : 0;
  const newDirector = { id: lastId + 1, name };

  directors.push(newDirector);

  res.status(201).json(newDirector);
});

// Uppdaterar en director
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const director = directors.find((d) => d.id === id);

  if (!director) {
    return res.status(404).json({
      error: "Director not found",
    });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  director.name = name;
  res.json(director);
});

// Raderar en director
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = directors.findIndex((d) => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Director not found",
    });
  }

  directors.splice(index, 1);
  res.status(204).send();
});

export default router;