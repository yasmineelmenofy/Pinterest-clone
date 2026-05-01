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
