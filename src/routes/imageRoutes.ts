import express from "express";
import { uploadImage } from "../controllers/imageController";
import { upload } from "../config/multer";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadImage);

export default router;