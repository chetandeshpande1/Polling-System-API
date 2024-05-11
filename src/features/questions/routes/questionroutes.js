

import express from 'express';
import { deleteQuestionById, getQuestion, postAddOption, postAddQuestion } from '../controller/questioncontroller.js';

const questionRouter = express.Router();

// routes
questionRouter.post('/create', postAddQuestion);
questionRouter.post('/:id/options/create', postAddOption);
questionRouter.delete('/:id/delete', deleteQuestionById);
questionRouter.get('/:id', getQuestion);

export default questionRouter;