export default function decorate(block) {
  if (block.classList.contains('column')) {
    block.classList.add('layout-column');
  } else {
    block.classList.add('layout-row');
  }

  const items = [...block.querySelectorAll(':scope > div')];

  items.forEach((item) => {
    const cols = item.querySelectorAll(':scope > div');
    const label = cols[0]?.textContent?.trim() || '';
    const fieldType = cols[1]?.textContent?.trim() || 'text';
    const iconImg = cols[3]?.querySelector('img');

    item.innerHTML = '';
    item.className = 'layout-item';

    const labelEl = document.createElement('label');
    labelEl.className = 'form-text-label';
    labelEl.textContent = label;

    const wrapper = document.createElement('div');
    wrapper.className = 'form-text-input-wrapper';

    let input;
    if (fieldType === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 4;
    } else {
      input = document.createElement('input');
      input.type = fieldType;
    }
    input.className = 'form-text-input';

    wrapper.append(input);

    if (iconImg) {
      const icon = document.createElement('span');
      icon.className = 'form-text-icon';
      icon.append(iconImg);
      wrapper.append(icon);
    }

    item.append(labelEl, wrapper);
  });
}
