import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title must be present for an Incident"],
      trim: true,
      maxlength: [100, "Title must be short"],
    },
    description: {
      type: String,
      required: [true, "Description must be present for an Incident"],
      maxlength: [1000, "Description must be not that long"],
    },
    type: {
      type: String,
      enum: ["accident", "fire", "theft"],
      required: [true, "Type of incident must be accident, fire and theft"],
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["active", "resolved"],
      default: "active",
      trim: true,
      lowercase: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;
