const mongoose = require("mongoose");
import { MONGODB_URI } from "./config";
mongoose
  .connect("MONGODB_URI")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
    maxLength: 20,
  },
});
const accountSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // accountNumber: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  balance: {
    type: Number,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };
