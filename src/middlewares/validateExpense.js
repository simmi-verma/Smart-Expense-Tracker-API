const { isValidDate } = require('../utils/validators');
const { storage } = require('../services/storageService');

/**
 * Middleware validating payload for POST /expenses.
 */
function validateCreateExpense(req, res, next) {
  const { id, title, amount, category, date } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required and cannot be empty.' });
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number greater than 0.' });
  }

  if (!category || typeof category !== 'string' || !category.trim()) {
    return res.status(400).json({ error: 'Category is required and cannot be empty.' });
  }

  if (!date || !isValidDate(date)) {
    return res.status(400).json({ error: 'Date must be a valid YYYY-MM-DD date string.' });
  }

  if (id && storage.getExpenseById(id)) {
    return res.status(400).json({ error: `Expense with ID '${id}' already exists.` });
  }

  // Attach sanitized numeric amount to request body for controller
  req.body.numericAmount = numericAmount;

  next();
}

module.exports = {
  validateCreateExpense,
};
