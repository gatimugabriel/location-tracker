import { Router } from 'express';
import {saveLocation, getLocations} from "../controllers/location.controller.js";

const router = Router();

router.route("/").post(saveLocation).get(getLocations);

export default router;
