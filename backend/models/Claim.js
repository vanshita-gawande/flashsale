import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    userId: String,
    campaignId: mongoose.Schema.Types.ObjectId,
    discount: Number,
    token: String,
  },
  { timestamps: true }
);

claimSchema.index({ userId: 1, campaignId: 1 }, { unique: true });

export default mongoose.model("Claim", claimSchema);
