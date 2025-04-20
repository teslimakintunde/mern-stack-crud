require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectToDB = require("./config/connectToDB");
const app = express();

const PORT = process.env.PORT || 3500;
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

try {
  connectToDB();
} catch (error) {
  console.log("DB connection fail", error);
}

try {
  app.use("/employees", require("./routes/employee"));
} catch (error) {
  console.log("Failed to load employees", error);
}

app.get("/", (req, res) => {
  res.json("wellcome to employee API");
});

//databse connection events

mongoose.connection.on("error", (error) => {
  console.log("Mongo db connection error", error);
});

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(PORT, () => console.log(`Databse running on port ${PORT}`));
});

//error handling middleware

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ errMessage: "Internal server error" });
});
