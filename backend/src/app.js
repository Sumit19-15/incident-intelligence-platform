import express from "express";
import cors from "cors";
import incidentRouter from "./routes/incident.routes.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(cors());

app.set("io", io);

app.use("/api/incidents", incidentRouter);

export default server;
