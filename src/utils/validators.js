/**
 * Utility functions for request parameter and body validation.
 */

/**
 * Checks if a string is a valid ISO/YYYY-MM-DD date.
 * @param {string} dateString
 * @returns {boolean}
 */
function isValidDate(dateString) {
  if (!dateString || typeof dateString !== 'string') return false;
  const d = new Date(dateString);
  return !isNaN(d.getTime());
}

module.exports = {
  isValidDate,
};
