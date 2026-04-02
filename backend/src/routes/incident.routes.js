import express from "express";
const router = express.Router();
import incidentController from "../controllers/incident.controller.js";

router.post("/", incidentController.createIncident);
router.get("/", incidentController.getIncidents);
router.patch("/:id", incidentController.updateIncident);
router.delete("/:id", incidentController.deleteIncident);

export default router;
