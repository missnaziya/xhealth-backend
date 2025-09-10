const Settings = require("../models/settings");

const controlPanelRoutes = async (req,res) =>{

  try{
    const settings = await Settings.findOne();
    if (!settings) {
      res.status(404).json({success:false,message:"No data found."})
    // Create new settings if none exist
    }
    res.status(200).json({success:true, controle : settings})   
  }catch(error){
    console.log("Error", error);    
  }
}

module.exports = {
    controlPanelRoutes
  };
  
