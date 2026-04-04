import axiosInstance from "./axios.config";

const sampleIncidents = [
  {
    title: "Traffic Collision",
    description: "Two cars collided near CP Circle",
    type: "accident",
    priority: "high",
    location: { lat: 28.6328, lng: 77.2197 },
  },
  {
    title: "Short Circuit",
    description: "Sparking in transformer near Metro Station",
    type: "fire",
    priority: "medium",
    location: { lat: 28.6139, lng: 77.209 },
  },
  {
    title: "Mobile Snatching",
    description: "Bike-borne miscreants in Karol Bagh",
    type: "theft",
    priority: "low",
    location: { lat: 28.655, lng: 77.1888 },
  },
  {
    title: "Water Logging",
    description: "Heavy rain causing blockages in Minto Road",
    type: "accident",
    priority: "medium",
    location: { lat: 28.634, lng: 77.232 },
  },
  {
    title: "Warehouse Fire",
    description: "Smoke detected in Okhla Phase 3",
    type: "fire",
    priority: "high",
    location: { lat: 28.5355, lng: 77.2732 },
  },
  {
    title: "Purse Stolen",
    description: "Occurred inside Hauz Khas Village",
    type: "theft",
    priority: "low",
    location: { lat: 28.5523, lng: 77.1945 },
  },
  {
    title: "Construction Collapse",
    description: "Minor wall collapse at Dwarka Sector 10",
    type: "accident",
    priority: "high",
    location: { lat: 28.581, lng: 77.058 },
  },
  {
    title: "Shop Lifting",
    description: "Caught on CCTV in Sarojini Nagar Market",
    type: "theft",
    priority: "medium",
    location: { lat: 28.577, lng: 77.198 },
  },
  {
    title: "Electrical Fire",
    description: "Apartment fire in Rohini Sector 15",
    type: "fire",
    priority: "high",
    location: { lat: 28.73, lng: 77.11 },
  },
  {
    title: "Bus Breakdown",
    description: "Blocking lane on NH44 near Mukarba Chowk",
    type: "accident",
    priority: "low",
    location: { lat: 28.737, lng: 77.157 },
  },
];

export const dbStore = async () => {
  console.log("Starting database seeding...");

  try {
    const promises = sampleIncidents.map((incident) =>
      axiosInstance.post("/incidents", incident),
    );
    await Promise.all(promises);

    console.log("Successfully added 10 sample incidents to Delhi!");
  } catch (error) {
    console.error(
      "Error seeding database:",
      error.response?.data || error.message,
    );
  }
};
