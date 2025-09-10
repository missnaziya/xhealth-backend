const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    content: [
        {
            title: { type: String, required: true },
            plan: [
                {
                    title: { type: String, required: true },
                    name: { type: String, required: true },
                    type: { type: String, required: true },
                    content: { type: String, required: true },
                    duration: { type: String, required: true },
                    image: { type: String, required: true },
                }
            ],
            status: { type: String,},
            review: { type: String, },           
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);

// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//     category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
//     questions: [
//         {
//             question: { type: String, required: true },
//             options: [
//                 {
//                     option: { type: String, required: true },
//                     weightage: { type: Number, required: true },
//                 }
//             ],
//         }
//     ],
// }, { timestamps: true });

// module.exports = mongoose.model('Question', questionSchema);
