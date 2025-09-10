const Settings = require("../../models/settings");


exports.updatePhoneLogin = async (req,res)=>{
    try {
        const { phone_login_enabled, email_login_enabled } = req.body;
        // const { phoneLoginEnabled } = req.body;
    
        // Find the current settings or create them if they don't exist
        let settings = await Settings.findOne();
        
 
        if (!settings) {
          settings = new Settings();  // Create new settings if none exist
        }else{
                 // Keep track of the existing values
  const currentPhoneLogin = settings.phoneLoginEnabled;
  const currentEmailLogin = settings.emailLoginEnabled;

  // Update only the fields that were sent in the request
  const updatedPhoneLogin = phone_login_enabled !== undefined ? phone_login_enabled : currentPhoneLogin;
  const updatedEmailLogin = email_login_enabled !== undefined ? email_login_enabled : currentEmailLogin;

  // Ensure at least one login method remains enabled
  if (!updatedPhoneLogin && !updatedEmailLogin) {
    return res.status(400).send({ 
      success: false, 
      message: "At least one login method must be enabled."
    });
  }
        }



    
        // Update the phoneLoginEnabled flag
        settings.phoneLoginEnabled = phone_login_enabled;
        settings.emailLoginEnabled = email_login_enabled;
        settings.updatedAt = Date.now();  // Update timestamp
    
        await settings.save();
        res.status(200).send({ success:true, message: "Login method updated successfully."});
      } catch (error) {
        res.status(500).send({ error: 'Failed to update settings' });
      }
}

exports.getSettingsData = async (req,res) =>{
  try{
    const settings = await Settings.findOne();
    if (!settings) {
      res.status(404).json({success:false,message:"No data found."})
    // Create new settings if none exist
    }
    res.status(200).json({success:true, control : settings})   
  }catch(error){
    console.log("Error", error);    
  }
}