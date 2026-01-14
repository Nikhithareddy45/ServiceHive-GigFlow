import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const submitBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;
    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== "open") {
      return res.status(400).json({ message: "Gig not available for bidding" });
    }
    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price
    });
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit bid" });
  }
};

export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;
    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    if (String(gig.ownerId) !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to view bids" });
    }
    const bids = await Bid.find({ gigId }).populate("freelancerId", "name email");
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { bidId } = req.params;
    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Gig not found" });
    }
    if (String(gig.ownerId) !== req.user.id) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Not authorized to hire" });
    }

    const updateGig = await Gig.updateOne(
      { _id: gig._id, status: "open" },
      { $set: { status: "assigned" } },
      { session }
    );
    if (updateGig.modifiedCount === 0) {
      await session.abortTransaction();
      return res.status(409).json({ message: "Gig already assigned" });
    }

    await Bid.updateOne(
      { _id: bid._id, status: "pending" },
      { $set: { status: "hired" } },
      { session }
    );
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id }, status: "pending" },
      { $set: { status: "rejected" } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    res.json({ message: "Hired successfully" });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Failed to hire" });
  }
};

export const rejectBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    const gig = await Gig.findById(bid.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    if (String(gig.ownerId) !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (gig.status !== "open") {
      return res.status(400).json({ message: "Gig already assigned" });
    }
    if (bid.status !== "pending") {
      return res.status(400).json({ message: "Bid already processed" });
    }
    bid.status = "rejected";
    await bid.save();
    res.json({ message: "Bid rejected" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject bid" });
  }
};

export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user.id })
      .populate("gigId", "title status budget");
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch my bids" });
  }
};
