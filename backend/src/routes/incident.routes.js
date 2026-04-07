import express from "express";
import incidentController from "../controllers/incident.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, incidentController.getIncidents);
router.post("/report", authMiddleware, incidentController.createIncident);
router.patch("/:id", authMiddleware, incidentController.updateIncident);
router.delete("/:id", authMiddleware, incidentController.deleteIncident);

export default router;
