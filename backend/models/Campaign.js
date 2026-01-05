import mongoose from "mongoose";

// schema for flash sale campaign
const campaignSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date,
  totalInventory: Number,
  claimedInventory: { type: Number, default: 0 },
  discountPercent: Number,
  maxDiscount: Number,
});

export default mongoose.model("Campaign", campaignSchema);
