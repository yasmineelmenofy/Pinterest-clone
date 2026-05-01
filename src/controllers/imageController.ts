import { Request, Response } from "express";
import Image from "../models/Image";

export const uploadImage = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = await Image.create({
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      userId: req.user.id,
    });

    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getImages = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const images = await Image.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Image.countDocuments();

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalImages: total,
      images,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

export const getImageById = async (req: any, res: any) => {
  try {
    const image = await Image.findById(req.params.id).populate(
      "userId",
      "name email",
    );

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(image);
  } catch (err) {
    res.status(500).json({ message: "Error fetching image" });
  }
};
