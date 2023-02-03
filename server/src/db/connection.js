const mongoose = require("mongoose");

const connection = async (username, password) => {
  mongoose.set("strictQuery", false);
  const url = `mongodb+srv://${username}:${password}@nikunj.gz95uco.mongodb.net/MERNcrud`;
  try {
    await mongoose.connect(url);
    console.log("connected to database");
  } catch (err) {
    if (err) throw err;
  }
};

module.exports = connection;
