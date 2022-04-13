const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({

  title: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },

  gender: {
    type: String,
    required: true
  },

  nic: {
    type: String,
    required: true,
    unique: true,
    match: /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/
  },

  dob: {
    type: Date,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  phoneno: {
    type: Number,
    required: true,
    match: /^(?:7|0|(?:\+94))[0-9]{9,10}$/
  },

  address: {
    type: String,
    required: true,
  },

  qualification: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  imgUrl: {
    type: String,
    required: false
  },

  profilePicture: {
    type: String,
    required: false
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
})

//this function run before saving data to database
StaffSchema.pre("save", async function (next) {

  //hashing the password
  //checking if the password is already hashed
  if (!this.isModified("password")) {
    next();
  }

  //hashing with the difficulty level 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

const Staff = mongoose.model("Staff", StaffSchema)
module.exports = Staff
