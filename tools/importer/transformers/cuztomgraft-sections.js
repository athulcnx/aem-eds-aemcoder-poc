/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: cuztomgraft sections.
 * Inserts section breaks (<hr>) between block tables after parsing is complete.
 * Runs in afterTransform hook (after parsers have replaced original elements with tables).
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName !== H.after) return;

  const document = element.ownerDocument;

  // After parsing, blocks become <table> elements. Find all block tables.
  const blockTables = element.querySelectorAll('table');
  if (blockTables.length < 2) return;

  // Insert <hr> between consecutive block tables to create section breaks
  for (let i = 1; i < blockTables.length; i++) {
    const table = blockTables[i];
    // Only insert if there isn't already an <hr> before this table
    const prev = table.previousElementSibling;
    if (!prev || prev.tagName !== 'HR') {
      const hr = document.createElement('hr');
      table.before(hr);
    }
  }
}
