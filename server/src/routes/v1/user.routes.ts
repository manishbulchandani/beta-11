import express from "express"
import * as authControllers from "../../controllers/auth/auth.controller"

const router = express.Router();

router.post('/register', authControllers.handleRegisterUser);

router.post('/login', authControllers.handleLoginUser);

router.post('/refresh-token', authControllers.handleRefreshToken);

export default router;
