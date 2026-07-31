const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Storage service managing expense persistence and calculation logic.
 */
class ExpenseStorage {
  constructor(persistenceFile = 'expenses.json') {
    this.persistenceFile = persistenceFile ? path.resolve(persistenceFile) : null;
    this.expenses = new Map();
    if (this.persistenceFile && fs.existsSync(this.persistenceFile)) {
      this._loadFromFile();
    }
  }

  _loadFromFile() {
    try {
      const data = fs.readFileSync(this.persistenceFile, 'utf8');
      const items = JSON.parse(data);
      if (Array.isArray(items)) {
        items.forEach((item) => {
          this.expenses.set(item.id, item);
        });
      }
    } catch (err) {
      this.expenses.clear();
    }
  }

  _saveToFile() {
    if (!this.persistenceFile) return;
    try {
      const data = Array.from(this.expenses.values());
      fs.writeFileSync(this.persistenceFile, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      // Ignore write errors gracefully
    }
  }

  addExpense({ id, title, amount, category, date }) {
    const expenseId = id ? String(id).trim() : uuidv4();
    const expense = {
      id: expenseId,
      title: String(title).trim(),
      amount: Math.round(Number(amount) * 100) / 100,
      category: String(category).trim(),
      date: String(date).trim(),
    };

    this.expenses.set(expenseId, expense);
    this._saveToFile();
    return expense;
  }

  getAllExpenses(category = null) {
    const items = Array.from(this.expenses.values());
    if (!category) return items;

    const catLower = String(category).trim().toLowerCase();
    return items.filter(
      (item) => item.category.toLowerCase() === catLower
    );
  }

  getExpenseById(id) {
    return this.expenses.get(String(id).trim()) || null;
  }

  deleteExpense(id) {
    const targetId = String(id).trim();
    if (this.expenses.has(targetId)) {
      this.expenses.delete(targetId);
      this._saveToFile();
      return true;
    }
    return false;
  }

  calculateTotals(category = null) {
    const items = this.getAllExpenses(category);

    let totalAmount = 0;
    const byCategory = {};

    items.forEach((item) => {
      totalAmount += item.amount;
      const cat = item.category;
      byCategory[cat] = Math.round(((byCategory[cat] || 0) + item.amount) * 100) / 100;
    });

    totalAmount = Math.round(totalAmount * 100) / 100;

    return {
      total_amount: totalAmount,
      by_category: byCategory,
    };
  }

  clear() {
    this.expenses.clear();
    if (this.persistenceFile && fs.existsSync(this.persistenceFile)) {
      try {
        fs.unlinkSync(this.persistenceFile);
      } catch (err) {
        // Ignore unlink error
      }
    }
  }
}

const storage = new ExpenseStorage('expenses.json');

module.exports = { ExpenseStorage, storage };
