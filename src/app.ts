import express from "express";
import patientRoutes from './routes/patientRoutes.js';

const app = express();
app.use(express.json());

app.use('/api', patientRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`)
);
