const mongoose = require("mongoose");
// const mongoUri = `mongodb+srv://pandeykaran1515:pandey_s15@cluster0.0bxiftz.mongodb.net/`;
// const mongoUri = `mongodb+srv://pandeykaran1515:karan_spandey15@cluster0.9tdallg.mongodb.net/?retryWrites=true&w=majority`;
const mongoUri = process.env.DB_URL;

const mongoDb = mongoose
  .connect(mongoUri, {})
  .then(() => {
    console.log("connection SuccessFull...");
  })
  .catch((err) => {
    console.log("connection unsuccesFull !!");
  });

module.exports = mongoDb;
