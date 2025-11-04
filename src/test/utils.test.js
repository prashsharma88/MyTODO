import { cleanTodoTitle } from '../utils.js';
import { expect, test, describe } from 'vitest';

describe('cleanTodoTitle', () => {
  test('should return the trimmed title for valid input', () => {
    expect(cleanTodoTitle('  Buy groceries  ')).toBe('Buy groceries');
  });

  test('should return null for empty string or only whitespace', () => {
    expect(cleanTodoTitle('')).toBeNull();
    expect(cleanTodoTitle('   ')).toBeNull();
  });

  test('should return the title when no trimming is needed', () => {
    expect(cleanTodoTitle('Setup CI pipeline')).toBe('Setup CI pipeline');
  });
});