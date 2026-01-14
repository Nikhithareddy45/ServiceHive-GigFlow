import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bidRoutes from "./routes/bidRoutes.js"
import gigRoutes from "./routes/gigRoutes.js";


const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/gigs", gigRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bids", bidRoutes);

export default app;
