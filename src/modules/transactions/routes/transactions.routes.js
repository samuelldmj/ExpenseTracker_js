const express = require('express');
const { addIncomeController } = require('../controllers/addIncomeController');
const { authMiddleware } = require('../../../middleware/authMiddleware');
const { addExpensesController } = require('../controllers/addExpensesController');


const transactionRoutes = express.Router();

transactionRoutes.use(authMiddleware);
transactionRoutes.post('/add-income', addIncomeController);
transactionRoutes.post('/add-expense', addExpensesController);


module.exports = {
    transactionRoutes
}