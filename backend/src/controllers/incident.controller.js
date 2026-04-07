import Incident from "../models/Incident.model.js";
import cloudinary from "../config/cloudinary.js";

const createIncident = async function (req, res) {
  try {
    const { title, description, type, location, priority, image } = req.body;

    if (
      !title ||
      !description ||
      !type ||
      !location.lat ||
      !location.lng ||
      !priority
    ) {
      return res
        .status(400)
        .json({ message: "All Required fields are necessary." });
    }

    const imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newIncident = await Incident.create({
      user: req.user._id,
      title,
      description,
      type,
      location,
      priority,
      image: imageUrl,
    });

    const io = req.app.get("io");
    io.emit("incidentCreated", newIncident);

    res.status(201).json({
      message: "A New incident is reported.",
      incident: newIncident,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in Create Incident controller",
      Error: error.message,
    });
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
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting all incidents",
      Error: error.message,
    });
  }
};

const updateIncident = async function (req, res) {
  try {
    const incidentId = req.params.id;
    const { description, status, priority, image } = req.body;

    let updates = { description, status, priority };

    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        updates.image = uploadResponse.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const incidentToUpdate = await Incident.findOneAndUpdate(
      { _id: incidentId, creator: req.user._id },
      { $set: updates },
      { new: true, runValidators: true },
    ).populate("user", "name");

    if (!incidentToUpdate) {
      return res.status(404).json({
        message: "Incident doesn't exist or you aren't the owner!",
      });
    }

    const io = req.app.get("io");
    if (io) io.emit("incidentUpdated", incidentToUpdate);

    res.status(200).json({
      message: "Incident updated successfully!",
      incident: incidentToUpdate,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error in updating Incident",
      error: error.message,
    });
  }
};

const deleteIncident = async function (req, res) {
  try {
    const incidentId = req.params.id;

    if (!incidentId) {
      return res.status(400).json({ message: "Incident ID is missing" });
    }

    const deletedIncident = await Incident.findOneAndDelete({
      _id: incidentId,
      user: req.user._id,
    });

    if (!deletedIncident) {
      return res
        .status(404)
        .json({ message: "Incident not found or unauthorized to delete." });
    }

    if (deletedIncident.image) {
      try {
        const publicId = deletedIncident.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion failed:", cloudinaryError);
      }
    }

    const io = req.app.get("io");
    if (io) {
      io.emit("incidentDeleted", deletedIncident);
    }

    res.status(200).json({
      message: "Incident and related media deleted successfully",
      incident: deletedIncident,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error in deleting Incident",
      error: error.message,
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
