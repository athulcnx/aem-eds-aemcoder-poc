export default function decorate(block) {
  const rows = [...block.children];
  const heading = block.querySelector('h3, h4, h2');
  const headingText = heading?.textContent || '';

  const fieldName = block.dataset.fieldName || 'lang_switch';
  const required = block.dataset.required !== 'false';

  const options = rows.slice(1).map((row) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent.trim() || '';
    const value = cols[1]?.textContent.trim() || '';
    const href = cols[2]?.textContent.trim() || '';
    const selected = cols[3]?.textContent.trim() === 'true';
    return {
      label, value, href, selected,
    };
  });

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'region-selector-wrapper';

  if (headingText) {
    const h = document.createElement('h3');
    h.textContent = headingText;
    wrapper.append(h);
  }

  const selectContainer = document.createElement('div');
  selectContainer.className = 'region-selector-field';

  const select = document.createElement('select');
  select.name = fieldName;
  if (required) {
    select.required = true;
    select.setAttribute('aria-required', 'true');
  }

  options.forEach(({
    label, value, href, selected,
  }) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = label;
    opt.dataset.href = href;
    if (selected) opt.selected = true;
    select.append(opt);
  });

  select.addEventListener('change', () => {
    const selectedOpt = select.options[select.selectedIndex];
    const { href } = selectedOpt.dataset;
    if (href) {
      window.location.href = href;
    }
  });

  selectContainer.append(select);
  wrapper.append(selectContainer);
  block.append(wrapper);
}
