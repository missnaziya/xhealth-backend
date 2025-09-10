const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();


const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);


const sendOtpEmail = async (email, otp) => {

  // Create reusable transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    host: "mail.cyberx-infosystem.us",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
    },
    secure: true,  // Use SSL
    // port: 587,     // Gmail's secure port
    port: 465,     // Gmail's secure port

  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: email, // recipient address
    subject: "Your OTP Code", // Subject line
    text: `Your OTP code is ${otp}`, // OTP message body
  };

  try {
    // Send OTP via email
    await transporter.sendMail(mailOptions);
    // Return success if email is sent
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Error sending OTP");
  }
};



const sendOtpPhone = async (otp, phone, country_code) => {
    try {
      const message = await client.messages.create({
        messagingServiceSid: process.env.TWILIO_SMS_ID,
        body: `Your OTP for xhealth is: ${otp} KAUCfmzBWSD`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+${country_code}${phone}`,
      });
      return { success: true, messageSid: message.sid, status: message.status };
    } catch (error) {
      console.error("Error:",error);
      return { success: false, error: error.message };
    }
  }


  const sendThankyouEmail = async (email) => {
  
    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: "mail.cyberx-infosystem.us",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
      },
      secure: true,  // Use SSL
      port: 465,     // Gmail's secure port
      // tls: {       rejectUnauthorized: false,  
      // }
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: email, // recipient address
      subject: "Thank You for Registering!",
      text: `Dear User,\n\nThank you for registering with us! We are excited to have you on board.\n\nIf you have any questions, feel free to reach out.\n\nBest Regards,\nYour Company Team`,
    };
  
    try {
      // Send OTP via email
      await transporter.sendMail(mailOptions);
      // Return success if email is sent
      return { success: true, message:  "Thank you email sent successfully" };
    } catch (error) {
      console.error("Error sending thank you email:", error);
      throw new Error("Error sending thank you email:");
    }
  };

module.exports = { sendOtpEmail, sendOtpPhone ,sendThankyouEmail};

