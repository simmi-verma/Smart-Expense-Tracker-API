const { storage } = require('../services/storageService');

/**
 * Controller handling expense HTTP endpoints.
 */
class ExpenseController {
  /**
   * POST /expenses - Add a new expense
   */
  createExpense(req, res) {
    const { id, title, category, date, numericAmount } = req.body;
    const newExpense = storage.addExpense({
      id,
      title,
      amount: numericAmount,
      category,
      date,
    });
    return res.status(201).json(newExpense);
  }

  /**
   * GET /expenses - Retrieve all expenses (or filter if ?category query provided)
   */
  getAllExpenses(req, res) {
    const { category } = req.query;
    const expenses = storage.getAllExpenses(category);
    return res.status(200).json(expenses);
  }

  /**
   * GET /expenses/filter?category=Food
   * Dedicated filter endpoint for category filtering.
   */
  getExpensesByCategory(req, res) {
    const category = req.query.category;
    if (!category || !String(category).trim()) {
      return res.status(400).json({ error: 'Category parameter is required for filtering.' });
    }
    const expenses = storage.getAllExpenses(category);
    return res.status(200).json(expenses);
  }

  /**
   * GET /expenses/totals - Calculate overall and category-wise totals
   */
  getTotals(req, res) {
    const { category } = req.query;
    const totals = storage.calculateTotals(category);
    return res.status(200).json(totals);
  }

  /**
   * DELETE /expenses/:id - Delete an expense by ID
   */
  deleteExpense(req, res) {
    const { id } = req.params;
    const deleted = storage.deleteExpense(id);
    if (!deleted) {
      return res.status(404).json({ error: `Expense with ID '${id}' not found.` });
    }
    return res.status(200).json({ message: `Expense '${id}' successfully deleted.`, id });
  }
}

module.exports = new ExpenseController();
