

import { ObjectId } from "mongodb";
import QuestionModel from "../../questions/model/questionschema.js";
import OptionModel from "../../options/model/optionschema.js";
import ApplicationError from "../../../Middleware/ApplicationError.js";

// create a new question function
export const add = async(title)=>{
    try {
        const newQuestion = new QuestionModel(title);
        return await newQuestion.save();
    } 
    catch (error) {
        throw error;
    }
}

// create a new option to a specific question function.
export const addOption = async(text, id)=>{
    try {
        const PORT = process.env.PORT;
        const question = await QuestionModel.findById(id);
        if(!question)
        {
            throw new ApplicationError("No question found by this id.", 404);
        }
    
        const newOption = new OptionModel({
            text: text,
            question: new ObjectId(id),
            link_to_vote: `http://localhost:${PORT}/api/options/${id}/add_vote`
        });
        const savedOption = await newOption.save();
        const optionId = savedOption._id;

        // link_to_vote with the optionId
        const link_to_vote = `http://localhost:${PORT}/api/options/${optionId}/add_vote`;
        
        // Updating the saved option with the constructed link_to_vote
        const updatedOption = await OptionModel.findByIdAndUpdate(optionId, { link_to_vote }, {
            new: true
        });

        // Updating to question options array.
        await QuestionModel.findByIdAndUpdate(id, {
            $push: { options: optionId}
        });
        return updatedOption;
    }
    catch (error) {
        throw error;
    }
}

// delete a question by id function.
export const deleteQuestion = async (id) => {
    try {
        const question = await QuestionModel.findById(id);
        if (!question) {
            throw new ApplicationError("No question found by this id.", 404);
        }

        const options = await OptionModel.find({ question: id });
        const isOptionHasVotes = options.some((option) => option.votes > 0);

        if (isOptionHasVotes) {
            throw new ApplicationError("Question cannot be deleted because its options have votes.",400);
        } 
        else {
            
            await OptionModel.deleteMany({ question: new ObjectId(id) });

            return await QuestionModel.findByIdAndDelete(id);
        }
    }
    catch (error) {
        throw error;
    }
};


// get a question by id function.
export const findQuestion = async(id)=>{
    try {
        const question = await QuestionModel.findById(id).populate('options');
        if(!question)
        {
            throw new ApplicationError("No question found by this id.", 404);
        }
        return question;
    } 
    catch (error) {
        throw error;
    }
    
}