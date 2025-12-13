import express from "express";
import http from "http";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import { setupPeerService } from "./services/peerService.js";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/api/ai", aiRoutes);

// Start server + WebRTC signaling
const server = http.createServer(app);
setupPeerService(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
