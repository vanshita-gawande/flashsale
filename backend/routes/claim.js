import express from "express";
import Campaign from "../models/Campaign.js";
import Claim from "../models/Claim.js";
import crypto from "crypto";

const router = express.Router();

router.post("/claim", async (req, res) => {
  const { userId, campaignId, cartValue } = req.body;

  try {
    const campaign = await Campaign.findOne({
      _id: campaignId,
      startTime: { $lte: new Date() },
      endTime: { $gte: new Date() },
    });

    if (!campaign) {
      return res.status(400).json({ message: "Campaign not live" });
    }

    const existing = await Claim.findOne({ userId, campaignId });
    if (existing) return res.json(existing);

    const updated = await Campaign.updateOne(
      { _id: campaignId, claimedInventory: { $lt: campaign.totalInventory } },
      { $inc: { claimedInventory: 1 } }
    );

    if (updated.modifiedCount === 0) {
      return res.status(400).json({ message: "Sold out" });
    }

    const discount = Math.min(
      (cartValue * campaign.discountPercent) / 100,
      campaign.maxDiscount
    );

    const claim = await Claim.create({
      userId,
      campaignId,
      discount,
      token: crypto.randomBytes(16).toString("hex"),
    });

    res.json(claim);
  } catch {
    res.status(400).json({ message: "Already claimed" });
  }
});

export default router;
