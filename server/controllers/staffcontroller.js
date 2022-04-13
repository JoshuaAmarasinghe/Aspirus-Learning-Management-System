const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Staff = require('../models/Staff');

//Staff Signup
exports.signupStaff = async (req, res) => {

  const { title, name, email, gender, nic, phoneno, address, qualification, role, password, imgUrl } = req.body;
  const dob = new Date(req.body.dob)

  const today = new Date().getFullYear()
  const year = dob.getFullYear()
  const age = today - year

  try {
    //checking email already exists
    const checkEmail = await Staff.findOne({ email })
    const checkNIC = await Staff.findOne({ nic })

    if (checkEmail)
      return res.status(409).json({ message: "User with this email already exists" })

    if (checkNIC)
      return res.status(409).json({ message: "User with this NIC already exists" })

    //creating a new Staff Member
    const staff = await Staff.create({ title, name, email, gender, nic, dob, age, phoneno, address, qualification, role, password, imgUrl });

    //creating a token
    const token = jwt.sign({ email: staff.email, id: staff._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    //sending the staff object and token as the response
    res.status(200).json({ success: true, result: staff, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

//Staff Login
exports.loginStaff = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password)
    return res.status(400).json({ message: "Please provide an email and password" });

  try {
    //finding staff by email
    const staff = await Staff.findOne({ email }).select("+password");

    //if staff doesn't exist
    if (!staff)
      return res.status(404).json({ message: "Invalid credentials" });

    //compare the provided password with the password in the database
    const ispasswordCorrect = await bcrypt.compare(password, staff.password);

    //if passwords don't match
    if (!ispasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    //creating a token
    const token = jwt.sign({ email: staff.email, id: staff._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    //sending the staff object and token as the response
    res.status(200).json({ success: true, result: staff, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message })
  }
}

//Staff update
exports.updateStaff = async (req, res) => {

  let staffID = req.params.id;
  const { email, phoneno, address, qualification, imgUrl } = req.body;

  //object with provided data
  const updateStaff = { email, phoneno, address, qualification, imgUrl }

  try {
    //find staff by staffID and update the staff with provided data
    await Staff.findByIdAndUpdate(staffID, updateStaff);

    //sending the status message successful 
    res.status(200).json({ message: "Staff member details updated" })
  } catch (error) {
    res.status(500).json({ message: "Error with updating data", error: error.message });
  }

}

//Staff delete
exports.deleteStaff = async (req, res) => {
  let staffID = req.params.id;

  try {
    //find staff by staffID and delete it
    await Staff.findByIdAndDelete(staffID);

    //sending the status message successful
    res.status(200).json({ success: true, message: "Staff member deleted" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

//fetch staff members
exports.fetchAll = async(req,res) => {

  try {
      //find all staff members in the database
      const staffs = await Staff.find();

      res.status(200).json({success: true, result: staffs})
  } catch (error) {
      res.status(500).json({success: false, message: "Something went wrong", error: error.message});
  }
}

//fetch one staff member
exports.fetchOne = async(req,res) => {
  let staffID = req.params.id;
  try {
      //find staff with the specific id
      const staff = await Staff.findById(staffID);

      res.status(200).json({success: true, result: staff})
  } catch (error) {
      res.status(500).json({success: false, message: "Something went wrong", error: error.message});
  }
}
