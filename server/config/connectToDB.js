const mongoose = require("mongoose");

const connectToDB = async () => {
  const connectionUrl = process.env.MONGODB_URL;
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("mongoDB connect successfully"))
    .catch((error) => console.log(error));
};

module.exports = connectToDB;
