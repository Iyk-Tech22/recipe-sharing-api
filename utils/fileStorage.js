/* eslint-disable no-console */

const multer = require("multer");
const sharp = require("sharp");
const firebaseAdmin = require("firebase-admin");

const AppError = require("./appError");
// eslint-disable-next-line node/no-unpublished-require
const serviceAccount = require("../config/gcs-config.json");

class FileStorage {
  constructor() {
    this.storage = multer.memoryStorage();
    this.upload = multer({
      storage: this.storage,
      fileFilter: this.filter(),
    });
  }

  static initialize() {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      storageBucket: process.env.GCS_BUCKET_NAME,
    });
  }

  static async deleteFile(fileName) {
    const bucket = firebaseAdmin.storage().bucket();
    const folderName = process.env.GCS_FOLDER_NAME || "recipe-sharing-api";
    const filePath = `${folderName}/${fileName}`;
    const file = bucket.file(filePath);

    try {
      await file.delete();
      console.log(`File ${fileName} deleted successfully.`);
    } catch (error) {
      throw new AppError(
        500,
        `Error deleting file ${fileName}: ${error.message}`,
      );
    }
  }

  filter() {
    return (req, file, cb) => {
      if (file.mimetype.startsWith("image")) {
        return cb(null, true);
      }
      return cb(new AppError(400, "Not a image! Please upload only images"));
    };
  }

  uploadSingle(fieldName) {
    return this.upload.single(fieldName);
  }

  uploadMultiple(fieldName) {
    return this.upload.array(fieldName);
  }

  async resizeImage(buffer, width, height, format = "jpeg", quality = 90) {
    return await sharp(buffer)
      .resize(width, height)
      .toFormat(format)
      .jpeg({ quality })
      .toBuffer();
  }

  processFileUpload() {
    const self = this;
    return async (req, res, next) => {
      let result;
      if (req.file) {
        const buffer = await self.resizeImage(req.file.buffer, 500, 500);
        result = [
          {
            originalname: req.file.originalname,
            buffer,
          },
        ];
      }

      if (req.files) {
        result = await Promise.all(
          req.files.map(async (file) => {
            const buffer = await self.resizeImage(file.buffer, 500, 500);
            return {
              originalname: file.originalname,
              buffer,
            };
          }),
        );
      }

      if (!result || result.length === 0) {
        return next(new AppError(400, "No files uploaded"));
      }

      let fileName;
      const bucket = firebaseAdmin.storage().bucket();
      const uploadPromises = result.map(async (file) => {
        const folderName = process.env.GCS_FOLDER_NAME || "recipe-sharing-api";
        fileName = `${Date.now()}-${file.originalname}`;
        const gcsFile = bucket.file(`${folderName}/${fileName}`);
        await gcsFile.save(file.buffer);
        await gcsFile.makePublic();
        return Promise.resolve({
          name: fileName,
          url: `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${folderName}/${fileName}`,
        });
      });

      try {
        const uploadResults = await Promise.all(uploadPromises);
        req.uploadedFiles = uploadResults;
        next();
      } catch (error) {
        console.error("Error uploading files:", error);
        next(new AppError(500, "Error uploading files"));
      }
    };
  }
}

module.exports = FileStorage;
