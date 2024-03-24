import { Router } from 'express';
import {saveLocation, getLocations} from "../controllers/location.controller.js";
import {verifyToken} from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyToken)
router.route("/").post(saveLocation).get(getLocations);

export default router;
