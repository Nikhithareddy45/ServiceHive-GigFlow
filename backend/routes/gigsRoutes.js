import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createGig, getOpenGigs, getMyGigs, getGigById } from "../controllers/gigsController.js";

const router = express.Router();

router.get("/", getOpenGigs);
router.post("/", authMiddleware, createGig);
router.get("/my-gigs", authMiddleware, getMyGigs);
router.get("/:id", authMiddleware, getGigById);

export default router;

