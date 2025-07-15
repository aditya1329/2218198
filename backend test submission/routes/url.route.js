import express from "express";
import { redirectUrl, urlShortnerController } from "../controller/url.controller.js";
const router = express.Router();

router.post("/shorten", urlShortnerController);
router.get("/:shortId", redirectUrl);

export default router;
