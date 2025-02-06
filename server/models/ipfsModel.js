const mongoose = require("mongoose");
const { Schema } = mongoose;

const IpfsSchema = new Schema({
  ipfsHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ipfs", IpfsSchema);
