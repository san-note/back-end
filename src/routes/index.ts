import * as config from "@@config/endPoint";
import authRoutes from "@@routes/auth.routes";
import express, { Router } from "express";

const router: Router = express.Router();

router.use(config.endPoint.auth.index, authRoutes);

export default router;
