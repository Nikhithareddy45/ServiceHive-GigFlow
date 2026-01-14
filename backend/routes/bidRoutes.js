import express from "express";
import { submitBid, getBidsForGig, hireBid, rejectBid, getMyBids } from "../controllers/bidsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, submitBid);
router.get("/my", authMiddleware, getMyBids);
router.get("/:gigId", authMiddleware, getBidsForGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);
router.patch("/:bidId/reject", authMiddleware, rejectBid);

export default router;
