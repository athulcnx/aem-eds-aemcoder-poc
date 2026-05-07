/* eslint-disable */
/* global WebImporter */

/**
 * Parser for form (Adaptive Form block).
 * Base block: form
 * Source selector: .file-upload-form
 * Source URL: https://cuztomgraft.zimvie.com/en-GB
 * Generated: 2026-05-07
 *
 * Adaptive Form block uses a 2-row table structure:
 * - Row 1: The form definition JSON URL (hosted on the EDS site)
 * - Row 2: The form content path (JCR path for the form definition)
 *
 * Per Adaptive Form requirements, form blocks never get variants -
 * always uses base 'form' name.
 */
export default function parse(element, { document }) {
  // For Adaptive Forms, the block table contains references to the form definition,
  // not the actual form fields. The form definition JSON will be created separately
  // and hosted on the EDS site. The parser generates placeholder paths that will
  // be updated during the form migration process.

  // Derive a form name from the source element for path generation
  const formId = element.getAttribute('id')
    || element.querySelector('form')?.getAttribute('id')
    || 'form-definition';

  // Row 1: Form definition JSON URL (relative path on the EDS site)
  const formJsonUrl = document.createElement('a');
  formJsonUrl.href = `/forms/${formId}.json`;
  formJsonUrl.textContent = `/forms/${formId}.json`;

  // Row 2: Form content path (JCR path for Universal Editor)
  const formContentPath = document.createElement('p');
  formContentPath.textContent = `/content/forms/af/${formId}`;

  const cells = [
    [formJsonUrl],
    [formContentPath],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
