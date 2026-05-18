export default function decorate(block) {
  const items = [...block.querySelectorAll(':scope > div')];
  block.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'products-grid';

  items.forEach((item) => {
    const cols = item.querySelectorAll(':scope > div');
    const name = cols[0]?.textContent?.trim() || '';
    const img = cols[1]?.querySelector('img');

    const tile = document.createElement('div');
    tile.className = 'product-tile';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'product';
    radio.value = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');

    const label = document.createElement('label');
    label.textContent = name;

    const radioRow = document.createElement('div');
    radioRow.className = 'product-radio-row';
    radioRow.append(radio, label);

    tile.append(radioRow);

    if (img) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'product-image';
      img.loading = 'lazy';
      imgWrap.append(img);
      tile.append(imgWrap);
    }

    tile.addEventListener('click', () => {
      radio.checked = true;
      grid.querySelectorAll('.product-tile').forEach((t) => t.classList.remove('selected'));
      tile.classList.add('selected');
    });

    grid.append(tile);
  });

  block.append(grid);
}
