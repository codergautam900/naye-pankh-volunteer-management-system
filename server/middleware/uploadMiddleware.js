import multer from "multer";

const storage = multer.memoryStorage();
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      const error = new Error("Only JPG, PNG, or WebP profile images are allowed");
      error.statusCode = 400;
      cb(error);
      return;
    }

    cb(null, true);
  }
});
