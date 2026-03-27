import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import directorsRouter from './routes/directors.js';

dotenv.config(); // Laddar in .env automatiskt så process.env fungerar
const app = express(); // Skapar servern

// Middleware, funktioner som körs innan routes
app.use(cors()); // Gör det möjligt för en frontend på en annan port att anropa API:et
app.use(express.json()); // Gör att Express kan läsa JSON och lägga det i req.body

// Endpoint som visar att servern kör och kan svara
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.use("/api/directors", directorsRouter);

// Startar servern
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
