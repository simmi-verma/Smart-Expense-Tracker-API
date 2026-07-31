const swaggerUi = require('swagger-ui-express');

// OpenAPI 3.0 Specification definition
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Smart Expense Tracker API',
    version: '1.0.0',
    description: 'A RESTful API for personal expense management built with Express (Node.js/MERN stack).',
  },
  paths: {
    '/': {
      get: {
        summary: 'Service Health Check',
        responses: {
          '200': { description: 'Service is active' },
        },
      },
    },
    '/expenses': {
      post: {
        summary: 'Add a new expense',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'amount', 'category', 'date'],
                properties: {
                  id: { type: 'string', example: 'exp-101' },
                  title: { type: 'string', example: 'Groceries' },
                  amount: { type: 'number', example: 45.50 },
                  category: { type: 'string', example: 'Food' },
                  date: { type: 'string', format: 'date', example: '2026-07-31' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Expense created successfully' },
          '400': { description: 'Validation error or duplicate ID' },
        },
      },
      get: {
        summary: 'View all expenses',
        parameters: [
          {
            name: 'category',
            in: 'query',
            schema: { type: 'string' },
            description: 'Optional category filter',
          },
        ],
        responses: {
          '200': { description: 'List of expenses' },
        },
      },
    },
    '/expenses/filter': {
      get: {
        summary: 'Filter expenses by category query parameter',
        parameters: [
          {
            name: 'category',
            in: 'query',
            required: true,
            schema: { type: 'string' },
            description: 'Category name to filter expenses by (e.g. Food)',
          },
        ],
        responses: {
          '200': { description: 'List of expenses matching category' },
          '400': { description: 'Missing category parameter' },
        },
      },
    },
    '/expenses/totals': {
      get: {
        summary: 'Calculate total expenses',
        parameters: [
          {
            name: 'category',
            in: 'query',
            schema: { type: 'string' },
            description: 'Optional category filter for calculation',
          },
        ],
        responses: {
          '200': { description: 'Overall total and category breakdown' },
        },
      },
    },
    '/expenses/{id}': {
      delete: {
        summary: 'Delete expense by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': { description: 'Expense deleted successfully' },
          '404': { description: 'Expense not found' },
        },
      },
    },
  },
};

function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = {
  setupSwagger,
  swaggerDocument,
};
