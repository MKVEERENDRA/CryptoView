//Config express
const express = require("express");
const dotenv = require("dotenv");
const process = require("process");
const workoutRoutes = require("./routes/workouts.js");
const usersRoutes = require("./routes/users.js");
const transactionsRoutes = require("./routes/Transactions.js");
const userPortfolio = require("./routes/userPortfolio.js");
const mongoose = require("mongoose");
const ipfsRoutes = require("./routes/ipfs.js");
const cors = require("cors");
const tokenBalanceRoutes = require("./routes/tokenBalance"); 
dotenv.config();

const app = express();

// configuration cors
const corsOptions = {
};
app.use(cors());

// middleware pour parser le json
app.use(express.json());

// middleware pour logger les requetes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts/", workoutRoutes);
app.use("/api/portfolio/", userPortfolio);
app.use("/api/transactions/", transactionsRoutes);
app.use("/api/users/", usersRoutes);
app.use("/api/ipfs/", ipfsRoutes);
app.use("/api/token", tokenBalanceRoutes); 


//connect to db et lancement du server
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen requests
    console.log(`connected to db`);
  })
  .catch((error) => {
     console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
