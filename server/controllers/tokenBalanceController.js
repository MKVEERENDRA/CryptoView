const Web3 = require("web3");
const dotenv = require("dotenv");
import {ERC20_ABI} from "../Erc.js"

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ALCHEMY_API_URL));



exports.getTokenBalance = async (req, res) => {
  try {
    const { walletAddress, tokenContract } = req.body;

    if (!web3.utils.isAddress(walletAddress)) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    const contractAddress = tokenContract || process.env.TOKEN_CONTRACT;

    if (!web3.utils.isAddress(contractAddress)) {
      return res.status(400).json({ error: "Invalid token contract address" });
    }

    const contract = new web3.eth.Contract(ERC20_ABI, contractAddress);

    const balance = await contract.methods.balanceOf(walletAddress).call();

    const decimals = await contract.methods.decimals().call();

    const formattedBalance = balance / Math.pow(10, decimals);

    res.json({ walletAddress, tokenContract: contractAddress, balance: formattedBalance, decimals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
