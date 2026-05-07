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
  // Live DOM structure for .file-upload-form__background:
  //   - CSS background-image on element itself (full-width cover image)
  //   - .file-upload-form__banner child div with CSS background-image (branded banner)
  // Neither image is an <img> tag on the live page; both are CSS backgrounds.
  // The parser must extract the background-image URL and create an <img> element.

  /**
   * Helper: extract background-image URL from an element's computed/inline style
   * and create an <img> element for it.
   */
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

  // Try to find an existing <img> first (handles scraped/cleaned HTML),
  // then fall back to CSS background-image extraction (handles live DOM)
  const bannerContainer = element.querySelector('.file-upload-form__banner');

  // Strategy 1: Look for actual <img> or <picture> elements
  let heroImage = element.querySelector(':scope > img, :scope > picture');
  if (!heroImage && bannerContainer) {
    heroImage = bannerContainer.querySelector('img, picture');
  }

  // Strategy 2: Extract from CSS background-image
  if (!heroImage) {
    // Prefer the banner image (branded content) as the hero image
    heroImage = getBackgroundImage(bannerContainer);
  }
  if (!heroImage) {
    // Fall back to the container's own background image
    heroImage = getBackgroundImage(element);
  }

  // Build cells array matching library example structure:
  // Row 1: image (field: image)
  // Row 2: text (field: text) - empty for image-only heroes
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

  // Row 2: Text field - this hero is image-only (no text overlay in source)
  // Empty row required by xwalk model structure; no hint for empty cells
  cells.push(['']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
