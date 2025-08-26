// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import reportRoutes from "./routes/reportRoutes.js";
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST"]
}));
app.use(bodyParser.json());

// Routes
app.use("/api/report", reportRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
