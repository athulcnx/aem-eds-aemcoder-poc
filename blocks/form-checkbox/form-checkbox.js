export default function decorate(block) {
  const items = [...block.querySelectorAll(':scope > div')];
  block.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'checkbox-row';

  items.forEach((item) => {
    const labelHTML = item.querySelector('div')?.innerHTML?.trim() || '';

    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox-item';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'checkbox-input';

    const label = document.createElement('label');
    label.className = 'checkbox-label';
    label.innerHTML = labelHTML;

    wrapper.append(input, label);
    row.append(wrapper);
  });

  block.append(row);
}
