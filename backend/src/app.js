import express from "express";
import cors from "cors";
const app = express();
import incidentRouter from "./routes/incident.routes.js";

app.use(express.json());
app.use(cors());

app.use("/api/incidents", incidentRouter);

export default app;
