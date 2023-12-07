// importing env and using env in index.js
import dotenv from "dotenv";
dotenv.config();

// connection to database
import mongoose from "mongoose";
mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connected !");
  })
  .catch((e) => {
    console.log(e);
  });

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error occured from database !");
});
db.on("open", () => {
  console.log("Databased connection successful !");
});