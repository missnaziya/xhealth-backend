const DailyReview = require("../models/dailyReview");
const { getPositiveStreak, assignBadge } = require("../utils/function");

const saveDailyReview = async (req,res) =>{
    const { userId, review, day_id, counselling_content_id ,date  } = req.body;
  
    await DailyReview.findOneAndUpdate(
      { userId, day_id,counselling_content_id },
      { review },
      { upsert: true, new: true }
    );
  
    const streak = await getPositiveStreak(userId);
    const badge = await assignBadge(userId);
  
    let message = `Thanks for rating today!`;
  
    if (streak === 3) message = `You're on a 3-day streak! Keep it up! 💪`;
    if (streak === 7) message = `Amazing! A full week of great ratings! 🎉`;
    if (badge) message += ` New badge unlocked: ${badge}`;
  
   return res.json({ success: true, message, streak });
  }

  module.exports = { saveDailyReview}