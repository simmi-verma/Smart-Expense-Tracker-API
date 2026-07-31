# Smart Expense Tracker API (Node.js / Express)

A lightweight, robust RESTful API for managing personal expenses, filtering transactions by category, calculating overall & category-wise totals, and maintaining data persistence. Built using **Node.js**, **Express**, **Jest**, and **Supertest** (MERN stack backend technology).

---

## Features

- **Add Expense**: Create expenses with title, positive amount, category, date, and optional custom ID (auto-generated UUID if omitted).
- **View All Expenses**: Retrieve all recorded expenses or filter by category (`GET /expenses?category=Food`).
- **Calculate Totals**: Get total spent across all expenses as well as a category-by-category breakdown (`GET /expenses/totals`).
- **Delete Expense**: Remove an expense by its unique ID with proper 404 error handling (`DELETE /expenses/{id}`).
- **Data Persistence**: In-memory storage backed by local JSON file (`expenses.json`) so state persists across server restarts.
- **Bonus Feature - Interactive OpenAPI / Swagger Docs**: Natively generated, interactive documentation accessible at `/docs`.

---

## Prerequisites

- **Node.js v16+** (v18 or v20 recommended)
- `npm` package manager

---

## How to Install Dependencies

From the root directory of the repository, run:

```bash
npm install
```

---

## How to Run the Server

To start the server, run:

```bash
npm start
```

For development mode with auto-reload:

```bash
npm run dev
```

The server will be active at `http://localhost:8000`.

- **Interactive Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## How to Run Tests

Run the integration test suite using **Jest** & **Supertest**:

```bash
npm test
```

---

## API Endpoints Reference

### 1. Health Check
- **`GET /`**
- **Response `200 OK`**:
  ```json
  {
    "status": "online",
    "service": "Smart Expense Tracker API (Node.js / Express)",
    "docs": "/docs",
    "version": "1.0.0"
  }
  ```

---

### 2. Add an Expense
- **`POST /expenses`**
- **Request Body**:
  ```json
  {
    "id": "exp-001",
    "title": "Groceries",
    "amount": 54.20,
    "category": "Food",
    "date": "2026-07-31"
  }
  ```
  *(Note: `id` is optional; if omitted, a unique UUID will be generated).*
- **Response `201 Created`**:
  ```json
  {
    "id": "exp-001",
    "title": "Groceries",
    "amount": 54.2,
    "category": "Food",
    "date": "2026-07-31"
  }
  ```

---

### 3. View All Expenses
- **`GET /expenses`**
- **Response `200 OK`**:
  ```json
  [
    {
      "id": "exp-001",
      "title": "Groceries",
      "amount": 54.2,
      "category": "Food",
      "date": "2026-07-31"
    }
  ]
  ```

---

### 4. Filter Expenses by Category
- **`GET /expenses/filter?category=Food`**
- **Response `200 OK`**:
  ```json
  [
    {
      "id": "exp-001",
      "title": "Groceries",
      "amount": 54.2,
      "category": "Food",
      "date": "2026-07-31"
    }
  ]
  ```

---

### 5. Calculate Total Expenses
- **`GET /expenses/totals`**
- **Query Parameters**:
  - `category` (optional, string) — Filter totals calculation by specific category.
- **Response `200 OK`**:
  ```json
  {
    "total_amount": 124.50,
    "by_category": {
      "Food": 54.20,
      "Transport": 20.30,
      "Entertainment": 50.00
    }
  }
  ```

---

### 6. Delete an Expense
- **`DELETE /expenses/:id`**
- **Response `200 OK`**:
  ```json
  {
    "message": "Expense 'exp-001' successfully deleted.",
    "id": "exp-001"
  }
  ```
- **Response `404 Not Found`**:
  ```json
  {
    "error": "Expense with ID 'exp-001' not found."
  }
  ```

---

## Project Structure

```
.
├── README.md           # Setup, installation, execution & API docs
├── AI_NOTES.md         # AI usage transparency breakdown
├── package.json        # Dependencies & test scripts
├── src/                # Core application source code
│   ├── app.js          # Express app assembly & health endpoint
│   ├── server.js       # HTTP server listener
│   ├── config/
│   │   └── swagger.js  # OpenAPI / Swagger specification & UI configuration
│   ├── controllers/
│   │   └── expenseController.js # Controller handlers for expense endpoints
│   ├── middlewares/
│   │   ├── validateExpense.js   # Request body validation middleware
│   │   └── errorHandler.js      # Fallback & global error handling
│   ├── routes/
│   │   └── expenseRoutes.js     # API route definitions
│   ├── services/
│   │   └── storageService.js    # Data persistence & aggregation layer
│   └── utils/
│       └── validators.js        # Reusable validator helpers
└── tests/              # Integration test suite
    └── expenseApi.test.js  # Jest + Supertest API tests
```
