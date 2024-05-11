


import ApplicationError from "../../../Middleware/ApplicationError.js";
import { add, addOption, deleteQuestion, findQuestion } from "../model/questionrepository.js";

// add a new question function.
export const postAddQuestion = async(req,res,next)=>{
    try {
        const title = req.body.title;
        if(!title)
        {
            throw new ApplicationError("Please provide title in the body.", 400);
        }

        const newQuestion = await add({title});
        if(!newQuestion)
        {
            throw new ApplicationError("Question not added something went wrong", 400);
        }
        res.status(201).json({
            success: "true",
            msg: "New question added successfully",
            question: newQuestion
        });
    } catch (error) {
        next(error);
    }
}

// add a new option to a question function.
export const postAddOption = async(req,res,next)=>{
    try {
        const id = req.params.id;
        if(!id)
        {
            throw new ApplicationError("Please provide id in parameters.", 400);
        }
        const text = req.body.text;
        if(!text)
        {
            throw new ApplicationError("Please provide title in the body.", 400);
        }
        const newOption = await addOption(text, id);
        if(!newOption)
        {
            throw new ApplicationError("Option not added something went wrong", 400);
        }
        res.status(201).json({
            success: true,
            msg: "New option added successfully",
            Option: newOption
            
        });
    } catch (error) {
        next(error);
    }
}

// Function to delete a question by id.
export const deleteQuestionById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        if(!id)
        {
            throw new ApplicationError("Please provide id in parameters.", 400);
        }
        const deletedOption = await deleteQuestion(id);

        if(!deletedOption)
        {
            return res.status(400).json({
                success: false,
                error: "This question can't deleted because its options has votes."
            });
        }
        res.status(200).json({
            success: true,
            msg: "Question deleted successfully.",
            deletedOption: deletedOption
        });
    } catch (error) {
        next(error);
    }
}

// Function to get a specific question by id.
export const getQuestion = async(req,res,next)=>{
    try {
        const id = req.params.id;
        if(!id)
        {
            throw new ApplicationError("Please provide id in parameters.", 400);
        }
        const question = await findQuestion(id);
        res.status(200).json({
            success: true,
            msg: "Question found successfully.",
            question: question
        })
    } catch (error) {
        next(error);
    }
}