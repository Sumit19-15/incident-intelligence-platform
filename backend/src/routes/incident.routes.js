import express from "express";
import incidentController from "../controllers/incident.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/report", authMiddleware, incidentController.createIncident); // incident form route
router.get("/", incidentController.getIncidents); // home route
router.patch("/:id", incidentController.updateIncident);
router.delete("/:id", incidentController.deleteIncident);

export default router;
