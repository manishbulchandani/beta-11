import express from "express"
import * as authControllers from "../../controllers/auth/auth.controller"
import * as userControllers from "../../controllers/user.controller"

const router = express.Router();

router.post('/register', authControllers.handleRegisterUser);

router.post('/login', authControllers.handleLoginUser);

router.post('/refresh-token', authControllers.handleRefreshToken);

router.get('/getUser', userControllers.handleGetUserById);

router.post('/getProfile', userControllers.handleGetProfileById);

router.post('/onboarding', userControllers.handleDoOnboarding);

router.post('/follow', userControllers.handleFollow);

export default router;
