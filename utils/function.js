

const crypto = require('crypto');  // To generate OTPs

// Utility function to generate a 4-digit OTP
const generateOtp = () => {
    return crypto.randomInt(1000, 10000).toString(); // Generate random OTP between 1000 and 9999
};






 const getPositiveStreak = async (userId) => {
    const ratings = await DailyRating.find({ userId }).sort({ date: -1 });
  
    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);
  
    for (let i = 0; i < ratings.length; i++) {
      const dayDiff = (today - new Date(ratings[i].date)) / (1000 * 60 * 60 * 24);
  
      if (dayDiff !== i) break; // if there's a missing day, break the streak
  
      if (ratings[i].rating >= 4) {
        streak++;
      } else {
        break; // rating < 4 ends the streak
      }
    }
  
    return streak;
  };
  

// Example badge logic
 const assignBadge = async (userId) => {
    const streak = await getPositiveStreak(userId);
    let badge = null;
  
    if (streak === 3) badge = "3-Day Streak 🌟";
    if (streak === 7) badge = "1-Week Warrior 🏅";
    if (streak === 30) badge = "Consistency King 👑";
  
    if (badge) {
      await User.updateOne(
        { _id: userId },
        { $addToSet: { badges: badge } } // avoid duplicates
      );
    }
  
    return badge;
  };
  

module.exports = { generateOtp, getPositiveStreak, assignBadge };
