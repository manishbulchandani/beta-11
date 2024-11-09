import express from "express"
import multer from "multer"
// import * as authControllers from "../../controllers/auth/auth.controller"
import * as timelineNodeControllers from "../../controllers/timelineNode.controller"

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/addTimelineNode', upload.single('file'), timelineNodeControllers.handleAddTimelineNode);

router.post('/getTimelineNodesGroupByTopic', timelineNodeControllers.handleGetTimelineNodeOrderByTopic);

export default router;
