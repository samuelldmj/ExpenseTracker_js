const express = require('express');
const { addIncomeController } = require('../controllers/addIncomeController');
const { authMiddleware } = require('../../../middleware/authMiddleware');
const { addExpensesController } = require('../controllers/addExpensesController');
const { getTransactionController } = require('../controllers/getTransactionController');


const transactionRoutes = express.Router();

transactionRoutes.use(authMiddleware);
transactionRoutes.post('/add-income', addIncomeController);
transactionRoutes.post('/add-expense', addExpensesController);
transactionRoutes.get('/', getTransactionController);


module.exports = {
    transactionRoutes
}