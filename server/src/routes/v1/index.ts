import express from "express";
import userRoutes from "./user.routes"
import timelineNodesRoutes from "./timelineNode.routes"

const router = express.Router();

router.use("/users", userRoutes);

router.use("/timelineNodes", timelineNodesRoutes);

export default router;
