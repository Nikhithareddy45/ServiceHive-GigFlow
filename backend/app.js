import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bidRoutes from "./routes/bidRoutes.js"
import gigRoutes from "./routes/gigRoutes.js";


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/gigs", gigRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bids", bidRoutes);

export default app;
