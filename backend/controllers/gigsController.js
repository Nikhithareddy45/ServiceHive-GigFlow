import Gig from "../models/Gig.js";
import Bid from "../models/Bid.js";

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;
    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id
    });
    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: "Failed to create gig" });
  }
};

export const getOpenGigs = async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const matchStage = { status: "open" };
    if (search) {
      matchStage.title = { $regex: search, $options: "i" };
    }
    const gigs = await Gig.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "bids",
          localField: "_id",
          foreignField: "gigId",
          as: "bids"
        }
      },
      {
        $addFields: {
          bidCount: { $size: "$bids" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "ownerId",
          foreignField: "_id",
          as: "owner"
        }
      },
      {
        $addFields: {
          ownerName: { $arrayElemAt: ["$owner.name", 0] }
        }
      },
      {
        $project: { bids: 0, owner: 0 }
      },
      { $sort: { createdAt: -1 } }
    ]);
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};

export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    const gigIds = gigs.map(g => g._id);
    const counts = await Bid.aggregate([
      { $match: { gigId: { $in: gigIds } } },
      { $group: { _id: "$gigId", count: { $sum: 1 } } }
    ]);
    const countMap = new Map(counts.map(c => [String(c._id), c.count]));
    const withCounts = gigs.map(g => ({
      ...g.toObject(),
      bidCount: countMap.get(String(g._id)) || 0
    }));
    res.json(withCounts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch my gigs" });
  }
};

export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("ownerId", "name email");
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    const isOwner = String(gig.ownerId) === req.user.id;
    const data = {
      ...gig.toObject(),
      isOwner,
      ownerName: gig.ownerId?.name
    };
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gig" });
  }
};
