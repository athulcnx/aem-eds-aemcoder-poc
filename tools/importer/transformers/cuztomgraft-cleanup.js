/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: cuztomgraft cleanup.
 * Removes non-authorable content from CuztomGraft pages.
 * All selectors validated against captured DOM in migration-work/cleaned.html.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // OneTrust cookie consent banner (line 400 in cleaned.html)
    // Modal/alert dialog overlay (line 663 - #emea-hcp HCP verification modal)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#emea-hcp',
    ]);
  }
  if (hookName === H.after) {
    // Global header navigation (line 11 - header.global-header)
    // Global footer experience fragment (line 330 - footer.global-footer)
    // Form error alert container that is hidden by default (line 38 - #demo-form-alert)
    WebImporter.DOMUtils.remove(element, [
      'header.global-header',
      'footer.global-footer',
      '#demo-form-alert',
      'noscript',
      'link',
      'iframe',
    ]);
  }
}
