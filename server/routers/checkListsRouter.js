const { Router } = require('express');
const { checklistTasksController } = require('../controllers/checkListsController');

const checklistRouter = new Router();

checklistRouter.get('/',checklistTasksController.getChecklistTasks);

module.exports = { checklistRouter };