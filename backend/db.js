const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Sivernial:etJyT9x43JPgEct6@livecohort.0qptjz1.mongodb.net/"
  )
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
    minLength: 5,
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

const User = mongoose.model("User", userSchema);

module.exports = User;
