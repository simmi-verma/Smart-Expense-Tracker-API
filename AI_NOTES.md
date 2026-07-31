# AI Usage Notes (`AI_NOTES.md`)

## AI Tool Used

* Claude (Sonnet 4.5) / Antigravity Assistant

---

## 1. Which parts were AI-generated vs. written by me

The core implementation of the Smart Expense Tracker API, including the layered REST architecture (controllers, services, validation middleware), was designed and written by me.

AI assistance was utilized for:

* Generating base setup files and boilerplate structure (`src/config/swagger.js`, OpenAPI 3.0 schema).
* Drafting initial Jest + Supertest integration test cases (`tests/expenseApi.test.js`).
* Drafting user-facing documentation (`README.md`).
* Identifying edge cases during testing.

---

## 2. What I validated, tested, or changed (Concrete Examples)

I reviewed, tested, and refined all AI-assisted code to ensure production quality and accuracy:

1. **Floating Point Rounding Precision**:
   * *Problem*: AI initially suggested using `Number.toFixed(2)` for category total calculations. However, `toFixed(2)` returns a `string` (e.g., `"54.20"`), breaking numeric schema contracts in JSON responses.
   * *Refinement*: Replaced it with mathematical rounding `Math.round(value * 100) / 100` across `src/services/storageService.js` to guarantee pure numeric floating-point values in API outputs.

2. **Strict Date Parsing & Validation**:
   * *Problem*: Standard `new Date(string)` in JavaScript parses invalid strings like `"invalid-date"` without throwing, returning `Invalid Date` instances.
   * *Refinement*: Added an explicit validator `isValidDate(dateString)` in `src/utils/validators.js` checking `!isNaN(new Date(dateString).getTime())` and ensuring non-whitespace strings to reject invalid dates with a proper `400 Bad Request`.

3. **Case-Insensitive Category Filtering**:
   * *Problem*: Initial AI code used strict string matching (`item.category === category`), which failed when query parameters differed in casing (e.g., `?category=food` vs `"Food"`).
   * *Refinement*: Modified `getAllExpenses()` and `calculateTotals()` to trim and lowercase inputs (`item.category.trim().toLowerCase() === category.trim().toLowerCase()`).

4. **Endpoint Consolidation & Redundancy Removal**:
   * *Problem*: AI generated two separate endpoints for category filtering: `/expenses/filter?category=X` and `/expenses/category/:category`.
   * *Refinement*: Standardized the API by consolidating category filtering into `GET /expenses/filter?category=X` (and `GET /expenses?category=X`), removing dead routes and synchronizing Swagger docs and tests accordingly.

---

## 3. AI suggestions I decided not to use & rationale

1. **Database & ORM Integration (MongoDB / Mongoose)**:
   * *Reason*: The project specifications explicitly state *"Data can be stored in memory or a local JSON file; no database is required."* Adding MongoDB/Mongoose introduces unnecessary setup overhead for reviewers. Implemented an in-memory `Map` synced with `expenses.json`.

2. **External Validation Libraries (Joi / Express-Validator)**:
   * *Reason*: Avoided bloated dependencies by implementing custom validation middleware (`src/middlewares/validateExpense.js`), keeping the project lightweight and fast.

---

## Final Note

AI was used as a development assistant for documentation generation, test drafting, and code optimization. All code was verified through automated Jest test suites (11/11 passing tests) and manual API testing.
