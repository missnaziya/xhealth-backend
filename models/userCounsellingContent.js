const mongoose = require('mongoose');
const category = require('./category');

const userCounsellingContentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true // Linking content to a user
      },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', },
    name: { type: String },
    content: [
        {
            // id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
            title: { type: String, },
            plan: [
                {
                    title: { type: String,  },
                    name: { type: String, },
                    type: { type: String, enum:["text", "audio", "video"] , default:"text",  },
                    content: [
                        {
                            textType: { type: String, enum: ["list", "paragraph"], default:"list"},
                            data: [
                                {     
                                    key: { type: String, },
                                    value: { type: [String], }
                                }
                            ]
                        }
                    ],
                    duration: { type: String, },
                    image: { type: String,  },
                    video:{type: String,  },
                    audio:{type: String,}
                }
            ],
            status: { type: String,},
            // status [lock, unlock, completed]
            review: { type: Number, },           
            // review: { type: Number, },           
        }  
    ],
    status:{ type: String, enum:["active", "inactive"] ,default:"active"}
    
}, { timestamps: true });

module.exports = mongoose.model('UserCounsellingContent', userCounsellingContentSchema);








