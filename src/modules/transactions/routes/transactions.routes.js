const express = require('express');
const { addIncomeController } = require('../controllers/addIncomeController');
const { authMiddleware } = require('../../../middleware/authMiddleware');
const { addExpensesController } = require('../controllers/addExpensesController');
const { getTransactionController } = require('../controllers/getTransactionController');
const { transactionReversalController } = require('../controllers/transactionReversalController');



const transactionRoutes = express.Router();

transactionRoutes.use(authMiddleware);
transactionRoutes.post('/add-income', addIncomeController);
transactionRoutes.get('/', getTransactionController);
transactionRoutes.delete("/:transactionId", transactionReversalController);


module.exports = {
    transactionRoutes
}