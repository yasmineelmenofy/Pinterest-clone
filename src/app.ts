import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import imageRoutes from "./routes/imageRoutes";
import path from "path";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/images", imageRoutes);
export default app;