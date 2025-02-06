const axios = require("axios");
const IpfsModel = require("../models/ipfsModel");
const dotenv = require("dotenv");

dotenv.config();

exports.storeOnIPFS = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text data is required" });

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      { text },
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      }
    );

    const ipfsHash = response.data.IpfsHash;
    const savedData = await IpfsModel.create({ ipfsHash });

    res.json({ ipfsHash, id: savedData._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.retrieveFromIPFS = async (req, res) => {
  try {
    const dataRecord = await IpfsModel.findById(req.params.id);
    if (!dataRecord) return res.status(404).json({ error: "Data not found" });

    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${dataRecord.ipfsHash}`;
    const response = await axios.get(ipfsUrl);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
