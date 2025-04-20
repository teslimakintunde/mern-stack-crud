// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const corsOptions = require("./config/corsOptions");
// const connectToDB = require("./config/connectToDB");
// const app = express();

// const PORT = process.env.PORT || 3500;
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors(corsOptions));

// try {
//   connectToDB();
// } catch (error) {
//   console.log("DB connection fail", error);
// }

// try {
//   app.use("/employees", require("./routes/employee"));
// } catch (error) {
//   console.log("Failed to load employees", error);
// }

// app.get("/", (req, res) => {
//   res.json("wellcome to employee API");
// });

// //databse connection events

// mongoose.connection.on("error", (error) => {
//   console.log("Mongo db connection error", error);
// });

// mongoose.connection.once("open", () => {
//   console.log("connected to DB");
//   app.listen(PORT, () => console.log(`Databse running on port ${PORT}`));
// });

// //error handling middleware

// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(500).json({ errMessage: "Internal server error" });
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectToDB = require("./config/connectToDB");
const serverless = require("serverless-http");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/employees", require("./routes/employee"));

// Root route
app.get("/api", (req, res) => {
  res.json("Welcome to the employee API");
});

// Mongo connection
let isConnected = false;

const connectDBOnce = async () => {
  if (!isConnected) {
    await connectToDB();
    isConnected = true;
  }
};

const handler = serverless(app);

module.exports = async (req, res) => {
  try {
    await connectDBOnce();
    return handler(req, res);
  } catch (err) {
    console.error("Mongo connection failed", err);
    return res.status(500).json({ error: "Database connection failed" });
  }
};
