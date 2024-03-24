import { Router } from 'express';
const router = Router();

import {signupInputs, passwordInput, validate} from "../middleware/validateInputs.middleware.js";
import {verifyToken, verifyRefreshToken} from "../middleware/auth.middleware.js";
import {signUp, signIn, signOut, refresh} from "../controllers/auth.controller.js";

router.post('/signup', [
    signupInputs,
    passwordInput,
    validate
], signUp);

router.post('/signin', signIn);
router.get('/signout',  [verifyToken], signOut);
router.post('/refresh', [verifyRefreshToken], refresh);

export default router;
