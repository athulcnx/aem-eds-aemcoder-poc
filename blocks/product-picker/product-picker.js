export default function decorate(block) {
  const rows = [...block.children];
  const heading = block.querySelector('h3, h4, h2');
  const headingText = heading?.textContent || '';

  const fieldName = block.dataset.fieldName || 'opt_article';
  const required = block.dataset.required !== 'false';
  const footnote = block.dataset.footnote || '';

  const items = rows.slice(1).map((row) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent.trim() || '';
    const value = cols[1]?.textContent.trim() || '';
    const img = cols[2]?.querySelector('img');
    const imageAlt = cols[3]?.textContent.trim() || label;
    return {
      label, value, img, imageAlt,
    };
  });

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'product-picker-wrapper';

  if (headingText) {
    const h = document.createElement('h3');
    h.textContent = headingText;
    wrapper.append(h);
  }

  const grid = document.createElement('div');
  grid.className = 'product-picker-grid';

  items.forEach(({
    label, value, img, imageAlt,
  }) => {
    const tile = document.createElement('label');
    tile.className = 'product-picker-tile';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = fieldName;
    radio.value = value;
    if (required) {
      radio.required = true;
      radio.setAttribute('aria-required', 'true');
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'product-picker-label';
    labelSpan.textContent = label;

    tile.append(radio);
    tile.append(labelSpan);

    if (img) {
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = imageAlt;
      image.className = 'product-picker-image';
      image.loading = 'lazy';
      tile.append(image);
    }

    grid.append(tile);
  });

  wrapper.append(grid);

  if (footnote) {
    const note = document.createElement('p');
    note.className = 'product-picker-footnote';
    const small = document.createElement('small');
    small.textContent = footnote;
    note.append(small);
    wrapper.append(note);
  }

  block.append(wrapper);
}
