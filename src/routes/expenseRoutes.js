const express = require('express');
const expenseController = require('../controllers/expenseController');
const { validateCreateExpense } = require('../middlewares/validateExpense');

const router = express.Router();

/**
 * POST /expenses - Add a new expense
 */
router.post('/expenses', validateCreateExpense, (req, res) =>
  expenseController.createExpense(req, res)
);

/**
 * GET /expenses/totals - Calculate overall and category totals
 */
router.get('/expenses/totals', (req, res) =>
  expenseController.getTotals(req, res)
);

/**
 * GET /expenses/filter - Dedicated filter endpoint by query parameter (?category=Food)
 */
router.get('/expenses/filter', (req, res) =>
  expenseController.getExpensesByCategory(req, res)
);


/**
 * GET /expenses - Retrieve all expenses (with optional query filter)
 */
router.get('/expenses', (req, res) =>
  expenseController.getAllExpenses(req, res)
);

/**
 * DELETE /expenses/:id - Delete expense by ID
 */
router.delete('/expenses/:id', (req, res) =>
  expenseController.deleteExpense(req, res)
);

module.exports = router;
