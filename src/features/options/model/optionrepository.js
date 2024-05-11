

import ApplicationError from "../../../Middleware/ApplicationError.js";
import OptionModel from "./optionschema.js";

// Function to delete a option
export const deleteOptionById = async(id)=>{
    try {
        const option = await OptionModel.findById(id);
        if(!option)
        {
            throw new ApplicationError("No option found by this id", 404);
        }
        if(option.votes > 0)
        {
            throw new ApplicationError("Option cannot be deleted because it has vote(s) on it .", 400);
        }
        return await OptionModel.findByIdAndDelete(id);
    } 
    catch (error) {
        throw error;
    }
}

// Function to add a vote to a option
export const addVote = async(id)=>{
    try {
        const option = await OptionModel.findById(id);
        if (!option) {
            throw new ApplicationError('No option found by this id', 400);
        }
        option.votes++;
        return await option.save();
    } 
    catch (error) {
        throw error;
    }
}