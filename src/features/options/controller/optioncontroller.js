

import ApplicationError from "../../../Middleware/ApplicationError.js";
import { addVote, deleteOptionById } from "../model/optionrepository.js";

// Function to delete a option by id.
export const deleteOption = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const deletedOption = await deleteOptionById(id);
        res.status(200).json({
            success: "true",
            msg: "Option deleted successfully.",
            deletedOption: deletedOption
        });
    } catch (error) {
        next(error);
    }
}

// Function to add vote to a option.
export const addVoteToOption = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const voted = await addVote(id);
        if(!voted){
            throw new ApplicationError("Vote not added something went wrong.", 400);
        }
        res.status(200).json({
            success: true,
            msg: "Vote added successfully.",
            Option: voted
        });
    } catch (error) {
        next(error);
    }
}