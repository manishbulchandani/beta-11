import express, { NextFunction } from "express";
import multer from "multer";
import * as timelineNodeControllers from "../../controllers/timelineNode.controller";

const storage = multer.memoryStorage();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (_req, file, cb) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
      ];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"));
      }
    },
  });
  

// const extractFilesFromResources = (req:Request, res:Response, next:NextFunction) => {
//     console.log(req.body);
//   if (req.body.resources) {

//     req.files = req.body.resources
//       .filter((item) => item.contentType === "FILE")
//       .map((item) => item.content);
//   }
//   console.log("Req,", req.files);
//   next();
// };

const router = express.Router();

router.post(
  "/addTimelineNode",
//   extractFilesFromResources,
  upload.array("files", 5),
  timelineNodeControllers.handleAddTimelineNode
);

router.post(
  "/getTimelineNodesGroupByTopic",
  timelineNodeControllers.handleGetTimelineNodeOrderByTopic
);
router.get("/getFeed", timelineNodeControllers.handleGetFeed);

export default router;
