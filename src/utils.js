/**
 * Processes a new todo item title by trimming whitespace and ensuring it's not empty.
 * @param {string} title The raw input string.
 * @returns {string | null} The cleaned title, or null if invalid.
 */
export const cleanTodoTitle = (title) => {
  if (!title) return null;
  const trimmed = title.trim();
  return trimmed.length > 0 ? trimmed : null;
};