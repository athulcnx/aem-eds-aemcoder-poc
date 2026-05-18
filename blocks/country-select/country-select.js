export default function decorate(block) {
  const items = [...block.querySelectorAll(':scope > div')];
  block.innerHTML = '';

  const options = [];
  items.forEach((item) => {
    const cols = item.querySelectorAll(':scope > div');
    const label = cols[0]?.textContent?.trim() || '';
    const value = cols[1]?.textContent?.trim() || label;
    if (label) options.push({ label, value });
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'country-select-wrapper';

  const select = document.createElement('select');
  select.className = 'country-select-native';
  options.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    select.append(option);
  });
  select.style.display = 'none';

  const trigger = document.createElement('div');
  trigger.className = 'cs-trigger';

  const valueSpan = document.createElement('span');
  valueSpan.className = 'cs-value';
  valueSpan.textContent = options[0]?.label || '';

  const iconWrap = document.createElement('span');
  iconWrap.className = 'cs-icon';
  iconWrap.innerHTML = '<svg class="cs-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
    + '<svg class="cs-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  trigger.append(valueSpan, iconWrap);

  const dropdown = document.createElement('div');
  dropdown.className = 'cs-dropdown';

  const searchWrap = document.createElement('div');
  searchWrap.className = 'cs-search';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search';
  searchWrap.append(searchInput);

  const list = document.createElement('div');
  list.className = 'cs-list';

  function closeDropdown() {
    trigger.classList.remove('open');
    dropdown.classList.remove('visible');
  }

  function buildOptions(filter = '') {
    list.innerHTML = '';
    options.forEach((opt) => {
      if (filter && !opt.label.toLowerCase().includes(filter.toLowerCase())) return;
      const optDiv = document.createElement('div');
      optDiv.className = 'cs-option';
      if (select.value === opt.value) optDiv.classList.add('selected');
      optDiv.textContent = opt.label;
      optDiv.addEventListener('click', () => {
        select.value = opt.value;
        valueSpan.textContent = opt.label;
        closeDropdown();
      });
      list.append(optDiv);
    });
  }

  function openDropdown() {
    trigger.classList.add('open');
    dropdown.classList.add('visible');
    buildOptions();
    searchInput.value = '';
    searchInput.focus();
  }

  trigger.addEventListener('click', () => {
    if (dropdown.classList.contains('visible')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  searchInput.addEventListener('input', () => buildOptions(searchInput.value));
  searchInput.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) closeDropdown();
  });

  dropdown.append(searchWrap, list);
  wrapper.append(select, trigger, dropdown);
  block.append(wrapper);
}
