export default function decorate(block) {
  const rows = [...block.children];
  const heading = block.querySelector('h3, h4, h2');
  const headingText = heading?.textContent || '';

  const layout = block.dataset.layout || 'two-col';
  const footnote = block.dataset.footnote || '';

  const fields = rows.slice(1).map((row) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent.trim() || '';
    const fieldName = cols[1]?.textContent.trim() || '';
    const fieldType = cols[2]?.textContent.trim() || 'text';
    const required = cols[3]?.textContent.trim() === 'true';
    const pattern = cols[4]?.textContent.trim() || '';
    const placeholder = cols[5]?.textContent.trim() || '';
    return {
      label, fieldName, fieldType, required, pattern, placeholder,
    };
  });

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'form-fields-wrapper';

  if (headingText) {
    const h = document.createElement('h3');
    h.textContent = headingText;
    wrapper.append(h);
  }

  const grid = document.createElement('div');
  grid.className = `form-fields-grid form-fields-grid-${layout}`;

  fields.forEach(({
    label, fieldName, fieldType, required, pattern, placeholder,
  }) => {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'form-fields-item';

    const labelEl = document.createElement('label');
    labelEl.className = 'form-fields-label';
    labelEl.textContent = label;
    labelEl.setAttribute('for', `field-${fieldName}`);

    let input;
    if (fieldType === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 6;
    } else {
      input = document.createElement('input');
      input.type = fieldType;
    }

    input.className = 'form-fields-input';
    input.id = `field-${fieldName}`;
    input.name = fieldName;
    if (required) {
      input.required = true;
      input.setAttribute('aria-required', 'true');
    }
    if (pattern) input.pattern = pattern;
    if (placeholder) input.placeholder = placeholder;
    input.setAttribute('aria-invalid', 'false');

    fieldWrapper.append(labelEl);
    fieldWrapper.append(input);
    grid.append(fieldWrapper);
  });

  wrapper.append(grid);

  if (footnote) {
    const note = document.createElement('p');
    note.className = 'form-fields-footnote';
    const small = document.createElement('small');
    small.textContent = footnote;
    note.append(small);
    wrapper.append(note);
  }

  block.append(wrapper);
}
