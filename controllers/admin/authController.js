const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const { validateEmail, validatePhone } = require("../../utils/validators");

// done
const signup = async (req, res) => {
    const {
      name,
      email,
      password,
      phone,
      preferred_language,
      device_token,
      device_id,
    } = req.body;
  
    // Input validation
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !preferred_language ||
      !device_token ||
      !device_id
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
  
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format." });
    }
  
    if (!validatePhone(phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number format." });
    }
  
    try {
      const existingEmail = await User.findOne({ email });
  
      if (existingEmail?.email === email) {
        return res
          .status(400)
          .json({ success: false, message: "Email already in use." });
      }
  
      const existingPhone = await User.findOne({ phone });
  
      if (existingPhone?.phone === phone) {
        return res
          .status(400)
          .json({ success: false, message: "Phone number already in use." });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        preferred_language,
        device_token,
        device_id,
        
      });
  
      // Return success response
      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        // user: {
        //   id: newUser.id,
        //   name: newUser.name,
        //   email: newUser.email,
        //   phone: newUser.phone,
        //   preferred_language: newUser.preferred_language,
        // },
      });
    } catch (error) {
      console.error("Error during user signup:", error);
  
      // Handle unique constraint errors
      if (error.name === "SequelizeUniqueConstraintError") {
        const field = error.errors[0]?.path || "unknown";
        const message =
          field === "email"
            ? "Email already in use."
            : field === "phone"
            ? "Phone number already in use."
            : `Duplicate entry in ${field}.`;
  
        return res.status(400).json({ success: false, message });
      }
  
      // Handle other server errors
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
};
const signinWithEmailPassword = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {

    const existingUser = await User.findOne({ email } );

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    


    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    

    // Generate a JWT token
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email ,role: existingUser.role  },
      process.env.JWT_SECRET,
      // { expiresIn: "1h" } // Token expires in 1 hour
    );
    // const existingUser = await User.findOne({ email });
    // Use the `set` method to set the values on the instance
    existingUser.set({
      token: token, // Update the email_otp field
    });

    // Save the updated instance back to the database
    await existingUser.save();
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token, // Return the JWT token
    
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {signup, signinWithEmailPassword}