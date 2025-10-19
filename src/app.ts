import express from "express";
import patientRoutes from './routes/patientRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import { setupSwagger } from './swagger.js';

const app = express();
app.use(express.json());

app.use('/api', patientRoutes);
app.use('/api', analysisRoutes);
setupSwagger(app);

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`)
);

export default app;
