const mongoose = require('mongoose')

const dailyReviewSchema = new mongoose.Schema({
    
userId : {type: String},
date: {type :String},
review : {type: String},
day_id : {type: String},
counselling_content_id : {type: String},
},{timestamps:true});

module.exports = mongoose.model('dailyReview', dailyReviewSchema)