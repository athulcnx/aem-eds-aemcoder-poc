/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero variant.
 * Base block: hero
 * Source: https://cuztomgraft.zimvie.com/en-GB
 * Selector: .file-upload-form__background
 * Model fields: image (reference), imageAlt (text/collapsed), text (richtext)
 * Generated: 2026-05-07
 */
export default function parse(element, { document }) {
  function getBackgroundImage(el) {
    if (!el) return null;
    const style = el.style && el.style.backgroundImage;
    const computed = el.ownerDocument.defaultView
      ? el.ownerDocument.defaultView.getComputedStyle(el).backgroundImage
      : '';
    const bgValue = style || computed || '';
    const match = bgValue.match(/url\(["']?([^"')]+)["']?\)/);
    if (match && match[1]) {
      const img = document.createElement('img');
      img.src = match[1];
      return img;
    }
    return null;
  }

  const bannerContainer = element.querySelector('.file-upload-form__banner');

  // Strategy 1: Look for actual <img> or <picture> elements (scraped/cleaned HTML)
  let heroImage = element.querySelector(':scope > img, :scope > picture');
  if (!heroImage && bannerContainer) {
    heroImage = bannerContainer.querySelector('img, picture');
  }

  // Strategy 2: Extract from CSS background-image (live DOM)
  if (!heroImage) {
    heroImage = getBackgroundImage(bannerContainer);
  }
  if (!heroImage) {
    heroImage = getBackgroundImage(element);
  }

  const cells = [];

  // Row 1: Image with field hint
  if (heroImage) {
    const imageFragment = document.createDocumentFragment();
    imageFragment.appendChild(document.createComment(' field:image '));
    imageFragment.appendChild(heroImage);
    cells.push([imageFragment]);
  } else {
    cells.push(['']);
  }

  // Row 2: Text field (empty for image-only hero)
  cells.push(['']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });

  // Insert hero block before the element, then move any remaining child content
  // (e.g., already-parsed form block) out before removing the container
  element.before(block);
  const remaining = element.querySelectorAll('table');
  remaining.forEach((table) => element.before(table));
  element.remove();
}
