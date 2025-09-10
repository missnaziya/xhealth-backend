const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', },
    name: { type: String },
    content: [
        {
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
            review: { type: Number, },           
            // review: { type: Number, },           
        }  
    ],
    status:{ type: String, enum:["active", "inactive"] ,default:"active"}
    
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);



// const mongoose = require('mongoose');

// const contentSchema = new mongoose.Schema({
//     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
//     name: { type: String },
//     content: [
//         {
//             title: { type: String, required: true },
//             plan: [
//                 {
//                     title: { type: String, required: true },
//                     name: { type: String, required: true },
//                     type: { type: String, required: true },
//                     content: { type: String, required: true },
//                     duration: { type: String, required: true },
//                     image: { type: String, required: true },
//                 }
//             ],
//             status: { type: String,},
//             review: { type: String, },           
//         }  
//     ],
//     status:{ type: String, enum:["Active", "Inactive"] ,default:"Active"}
    
// }, { timestamps: true });

// module.exports = mongoose.model('Content', contentSchema);
