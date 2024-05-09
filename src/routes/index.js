import express from "express";
import { routesV1 } from "./v1/index.js";
const router = express.Router();

router.use("/v1", routesV1);

export { router as api };
