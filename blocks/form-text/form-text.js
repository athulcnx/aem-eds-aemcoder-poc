export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const label = rows[0]?.querySelector('div')?.textContent?.trim() || '';
  const fieldType = rows[1]?.querySelector('div')?.textContent?.trim() || 'text';
  const fieldWidth = rows[2]?.querySelector('div')?.textContent?.trim() || 'half';
  const iconImg = rows[3]?.querySelector('img');

  block.innerHTML = '';
  block.classList.add(`form-text-${fieldWidth}`);

  const parentWrapper = block.parentElement;
  if (parentWrapper && fieldWidth === 'half') {
    parentWrapper.classList.add('form-text-wrapper-half');
  } else if (parentWrapper && fieldWidth === 'full') {
    parentWrapper.classList.add('form-text-wrapper-full');
  }

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
  input.placeholder = '';

  wrapper.append(input);

  if (iconImg) {
    const icon = document.createElement('span');
    icon.className = 'form-text-icon';
    icon.append(iconImg);
    wrapper.append(icon);
  }

  block.append(labelEl, wrapper);
}
