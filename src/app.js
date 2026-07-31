const express = require('express');
const { setupSwagger } = require('./config/swagger');
const expenseRoutes = require('./routes/expenseRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Parse JSON request body
app.use(express.json());

// Setup Swagger UI documentation
setupSwagger(app);

// Service Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Smart Expense Tracker API (Node.js / Express)',
    docs: '/docs',
    version: '1.0.0',
  });
});

// API Routes
app.use('/', expenseRoutes);

// Fallback & error handling middlewares
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
