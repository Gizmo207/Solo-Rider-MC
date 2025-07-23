// utils.ts - Utility functions for classnames and more

/**
 * cn - Combines multiple class names into a single string.
 * Filters out falsy values and joins with a space.
 *
 * @param {...(string | undefined | null | false)[]} classes - List of class names
 * @returns {string} - Combined class name string
 */
export function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}
