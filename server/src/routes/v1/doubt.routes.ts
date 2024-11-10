import express from "express"
import * as doubtControllers from "../../controllers/doubt.controller"
import multer from "multer";

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
      ];
      if (allowedTypes.includes(file.mimetype)) {
          console.log("Here",file)
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"));
      }
    },
  });



router.post('/addDoubt',upload.single("file"), doubtControllers.handleAddDoubt);

router.post('/getDoubts', doubtControllers.handleGetDoubts);

router.post('/addThread', doubtControllers.handleAddThread);

export default router;
