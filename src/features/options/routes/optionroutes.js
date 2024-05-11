

import express from 'express';
import { addVoteToOption, deleteOption } from '../controller/optioncontroller.js';

const optionRouter = express.Router();

optionRouter.delete('/:id/delete', deleteOption);
optionRouter.get('/:id/add_vote', addVoteToOption);

export default optionRouter;