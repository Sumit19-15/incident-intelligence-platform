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

    const io = req.app.get("io");
    io.emit("incidentCreated", newIncident);

    res.status(201).json({
      message: "A New incident is reported.",
      incident: newIncident,
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
      incidents: sortedIncidents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in getting all incidents" });
  }
};

const updateIncident = async function (req, res) {
  try {
    const incidentId = req.params.id;
    const { status, priority } = req.body;

    // if (!status || !priority) {
    //   return res
    //     .status(400)
    //     .json({ message: "Priority and Status are only allowed to update." });
    // }

    const incidentToUpdate = await Incident.findByIdAndUpdate(
      incidentId,
      { status, priority },
      { returnDocument: "after", runValidator: true },
    );

    if (!incidentToUpdate) {
      return res.status(404).json({ message: "Incident not exists!" });
    }

    const io = req.app.get("io");
    io.emit("incidentUpdated", incidentToUpdate);

    res.status(200).json({
      message: "Incident update successfully!",
      incident: incidentToUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error in updating Incident",
      Error: error,
    });
  }
};

const deleteIncident = async function (req, res) {
  try {
    const incidentId = req.params.id;

    const deletedIncident = await Incident.findByIdAndDelete(incidentId);

    if (!deletedIncident) {
      return res
        .status(404)
        .json({ message: "Incident not found to be deleted." });
    }

    const io = req.app.get("io");
    io.emit("incidentDeleted", deletedIncident);

    res.status(200).json({
      message: "Incident deleted Successfully",
      incident: deletedIncident,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server Error in deleting Incident",
      Error: err,
    });
  }
};

const incidentController = {
  createIncident,
  getIncidents,
  updateIncident,
  deleteIncident,
};
export default incidentController;
