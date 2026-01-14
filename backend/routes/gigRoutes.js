import express from "express";
import { getOpenGigs , createGig,getGigById, getMyGigs} from "../controllers/gigsController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

// Public route
router.get("/", getOpenGigs);
router.post("/", authMiddleware, createGig);
router.get("/my-gigs", authMiddleware, getMyGigs);
router.get("/:id", authMiddleware, getGigById);

 
 
export default router;
