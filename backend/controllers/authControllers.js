const userModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      gender,
      password,
      confirmPassword,
      profileImage,
    } = req.body;

    if (password !== confirmPassword) {
      return res.json({ error: "Password doesn't match" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ error: "User Already Exist" });
    }
    const boyProfileImage = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfileImage = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    // profileImage= req.file?.path

    //Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      username,
      gender,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      profileImage: gender === "male" ? boyProfileImage : girlProfileImage,
    });
    const registeredUser = await newUser.save();
    const token = generateToken(registeredUser._id);

    res.cookie("jwt-Token",token,{
      httpOnly: true, // xss
      secure: true,
      sameSite: "strict", // csrf
    })
    .status(201).json({
      message: "user created successfully",
      status: true,
      loggedInUser: {
        _id: registeredUser._id,
        name: registeredUser.name,
        username: registeredUser.username,
        email: registeredUser.email,
        profileImage: registeredUser.profileImage,
      },
      jwtToken: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", success: false, error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "user doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      return res.json({ error: "Invalid username or password" });
    }
    const token = generateToken(user._id);
    console.log("login token is ", token);

    res.cookie("jwt-Token",token,{
      httpOnly: true, // xss
      secure: true,
      sameSite: "strict", // csrf
    }).status(200).json({
      message: "loggedIn successfully",
      status: true,
      loggedInUser: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      jwtToken: token,
    });
  } catch (error) {
    res.json({
      message: "Internal server error",
      error: error,
      success: false,
    });
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signup, login, logOut };
