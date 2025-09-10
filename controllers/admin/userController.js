const Profile = require('../../models/Profile');
const User = require('../../models/User'); // Assuming you have a User model

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role:"user"}); // Example: Fetch all users from the database
    res.status(200).json({ success: true, users: users, });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
// Fetch user by ID
const getUserById = async (req, res) => {
    const { id } = req.params; // Extract user ID from request parameters
  
    try {
      const user = await User.findById(id); // Fetch user by ID from the database
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };    
// Update user by ID
const updateUser = async (req, res) => {
    const userData = req.body; // Extract updated user data from the request body
    try {
      // Find user by ID and update their information
      const user = await User.findByIdAndUpdate(userData.id, userData);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User Updated Successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };  
// Delete user by ID
const deleteUser = async (req, res) => {
    const { user_id } = req.query; // Extract user ID from the request parameters

    
  
    try {
      // Find and delete the user by ID


      
      const user = await User.findByIdAndDelete({_id: user_id});
  console.log(user);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  // Optionally delete associated user profile (if applicable)
  await Profile.findOneAndDelete({ userId: user_id });
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
};
  

module.exports = { getAllUsers,getUserById ,updateUser ,deleteUser };
