

import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    options: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Option'
        }
    ]
});

const QuestionModel = mongoose.model('Question', questionsSchema);
export default QuestionModel;