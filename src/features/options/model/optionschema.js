// Options schema is created here and its model.
// Imports
import mongoose from "mongoose";

const optionsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    question: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Question'
    },
    votes: {
        type: Number,
        default: 0
    },
    link_to_vote: {
        type: String
    }
});

// Option model
const OptionModel =  mongoose.model('Option', optionsSchema);
export default OptionModel;