const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hej från Node.js server!");
});

app.listen(port, () => {
  console.log(`Servern körs på port ${port}`);
});
