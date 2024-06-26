const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: [true, "phone number already exists"]
  },
  emailId: {
    type: String,
    required: true,
    unique: [true, "emailId already exists"]
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    required:true
  },
  registrationNumber: {
    type: String,
  },
  vehicleModel: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  }

});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
