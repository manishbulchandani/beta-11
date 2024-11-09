import express from "express"
// import * as authControllers from "../../controllers/auth/auth.controller"
import * as timelineNodeControllers from "../../controllers/timelineNode.controller"

const router = express.Router();

router.post('/addTimelineNode', timelineNodeControllers.handleAddTimelineNode);

router.post('/getTimelineNodesGroupByTopic', timelineNodeControllers.handleGetTimelineNodeOrderByTopic);

export default router;
