import express from "express"
import * as doubtControllers from "../../controllers/doubt.controller"

const router = express.Router();

router.post('/addDoubt', doubtControllers.handleAddDoubt);

router.get('/getDoubts', doubtControllers.handleGetDoubts);

router.post('/addThread', doubtControllers.handleAddThread);

export default router;
