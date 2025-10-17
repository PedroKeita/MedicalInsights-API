import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
