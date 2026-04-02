import Incident from "../models/incident.model.js";

const createIncident = async function (req, res) {
  try {
    const { title, description, type, location } = req.body;

    if (!title || !description || !type || !location.lat || !location.lng) {
      return res
        .status(400)
        .json({ message: "All Required fields are necessary" });
    }

    const newIncident = await Incident.create({
      title,
      description,
      type,
      location,
    });

    res.status(201).json({
      message: "New incident is created",
      newIncident: newIncident,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in Create Incident controller", err });
  }
};

// todo is limiting the sorted list any user are getting all the incidents even though they can't work on it
// plus what about resolved incidents
const getIncidents = async function (req, res) {
  try {
    const sortedIncidents = await Incident.find().sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "Incidents fetched successfully",
      Incidents: sortedIncidents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in getting all incidents" });
  }
};

const incidentController = {
  createIncident,
  getIncidents,
};
export default incidentController;
