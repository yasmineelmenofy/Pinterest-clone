import express from "express";
import {
  uploadImage,
  getImages,
  getImageById,
} from "../controllers/imageController";
import { upload } from "../config/multer";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadImage);
router.get("/", getImages);
router.get("/:id", getImageById);
export default router;
