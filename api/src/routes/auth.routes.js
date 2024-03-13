import { Router } from 'express';
const router = Router();
import { authController } from '../controllers/index.js';
import { authMiddleware, inputValidationMiddleware } from '../middleware/index.js';

router.post('/signup', [
    inputValidationMiddleware.signupInputs,
    inputValidationMiddleware.passwordInput,
    inputValidationMiddleware.validate
], authController.signUp);

router.post('/signin', authController.signIn);
router.get('/signout',  authMiddleware.verifyToken, authController.signOut);
router.post('/refresh', authMiddleware.verifyRefreshToken, authController.refresh);

export default router;
