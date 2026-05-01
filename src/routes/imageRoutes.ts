import express from "express";
import {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
} from "../controllers/imageController";
import { upload } from "../config/multer";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadImage);
router.get("/", getImages);
router.get("/:id", getImageById);
router.delete("/:id", protect, deleteImage);

export default router;
