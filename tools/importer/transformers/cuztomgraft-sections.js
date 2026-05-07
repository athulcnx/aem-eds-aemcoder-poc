/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: cuztomgraft sections.
 * Inserts section breaks (<hr>) and Section Metadata blocks based on template sections.
 * Only runs when template has 2+ sections defined in page-templates.json.
 * All selectors validated against captured DOM in migration-work/cleaned.html.
 *
 * Section selectors from page-templates.json:
 *   section-1: .file-upload-form__background (line 30 in cleaned.html)
 *   section-2: .file-upload-form (line 36 in cleaned.html - nested inside section-1)
 *   section-3: .container.rhythm--large.grid__gap--none (line 310 in cleaned.html - disclaimer)
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument;
    const sections = template.sections;

    // Process sections in reverse order to avoid position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) continue;

      // Add Section Metadata block after the section element if style is defined
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before non-first sections to create section breaks
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
