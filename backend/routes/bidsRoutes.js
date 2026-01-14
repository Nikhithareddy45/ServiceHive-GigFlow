import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { submitBid, getBidsForGig, hireBid } from "../controllers/bidsController.js";

const router = express.Router();

router.post("/", authMiddleware, submitBid);
router.get("/:gigId", authMiddleware, getBidsForGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);

export default router;

