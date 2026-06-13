import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, folder = "nayepankh-volunteers") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

