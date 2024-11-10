import express from "express";
import userRoutes from "./user.routes"
import timelineNodeRoutes from "./timelineNode.routes"
import doubtRoutes from "./doubt.routes"

const router = express.Router();

router.use("/users", userRoutes);

router.use("/timelineNodes", timelineNodeRoutes);

router.use("/doubts", doubtRoutes);

export default router;
