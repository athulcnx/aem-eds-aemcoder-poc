async function fetchFormData(url) {
  const resp = await fetch(url);
  if (!resp.ok) return null;
  return resp.json();
}

function createField(field, doc) {
  const wrapper = doc.createElement('div');
  const safeName = field.Name ? field.Name.replace(/[[\]]/g, '').replace(/_/g, '-') : '';
  wrapper.className = `field-wrapper ${field.Type}-wrapper field-${safeName}`;

  if (field.Mandatory) wrapper.dataset.required = 'true';

  if (field.Type === 'submit') {
    const btn = doc.createElement('button');
    btn.type = 'submit';
    btn.textContent = field.Label;
    wrapper.classList.add('submit-wrapper');
    wrapper.append(btn);
    return wrapper;
  }

  if (field.Type === 'plaintext') {
    const p = doc.createElement('p');
    p.textContent = field.Label;
    wrapper.classList.add('plain-text-wrapper');
    wrapper.append(p);
    return wrapper;
  }

  const label = doc.createElement('label');
  label.className = 'field-label';
  label.textContent = field.Label;

  if (field.Type === 'select') {
    const select = doc.createElement('select');
    select.name = field.Name;
    if (field.Mandatory) select.required = true;
    const options = field.Options ? field.Options.split(',') : [];
    const optionNames = field.OptionNames || options;
    options.forEach((val, i) => {
      const opt = doc.createElement('option');
      opt.value = val.trim();
      opt.textContent = Array.isArray(optionNames) ? optionNames[i] : val.trim();
      if (val.trim() === field.Value) opt.selected = true;
      select.append(opt);
    });
    wrapper.classList.add('drop-down-wrapper');
    wrapper.append(label, select);
    return wrapper;
  }

  if (field.Type === 'radio') {
    const input = doc.createElement('input');
    input.type = 'radio';
    input.name = field.Name;
    input.value = field.Value;
    if (field.Mandatory) input.required = true;
    wrapper.classList.add('radio-wrapper');
    wrapper.append(input, label);
    return wrapper;
  }

  if (field.Type === 'checkbox') {
    const input = doc.createElement('input');
    input.type = 'checkbox';
    input.name = field.Name;
    input.value = field.Value || 'on';
    if (field.Mandatory) input.required = true;
    wrapper.classList.add('checkbox-wrapper');
    if (field.Label && field.Label.includes('Privacy Policy')) {
      label.innerHTML = '*I Accept the <a href="https://www.zimvie.eu/en/privacy-notice.html">Privacy Policy</a>';
    }
    wrapper.append(input, label);
    return wrapper;
  }

  if (field.Type === 'textarea') {
    const textarea = doc.createElement('textarea');
    textarea.name = field.Name;
    textarea.placeholder = field.Placeholder || '';
    if (field.Mandatory) textarea.required = true;
    wrapper.classList.add('multiline-wrapper');
    wrapper.append(label, textarea);
    return wrapper;
  }

  if (field.Type === 'file') {
    const desc = doc.createElement('div');
    desc.className = 'field-description';
    desc.textContent = field.Description || '';
    wrapper.classList.add('file-wrapper', 'decorated');
    wrapper.append(label, desc);
    return wrapper;
  }

  const input = doc.createElement('input');
  input.type = field.Type || 'text';
  input.name = field.Name;
  input.placeholder = field.Placeholder || '';
  if (field.Mandatory) input.required = true;
  if (field.Pattern) input.pattern = field.Pattern;

  wrapper.append(label, input);
  return wrapper;
}

export default async function decorate(block) {
  const link = block.querySelector('a[href$=".json"]');
  if (!link) return;

  const jsonUrl = link.href;
  const formData = await fetchFormData(jsonUrl);
  if (!formData || !formData.data) return;

  block.textContent = '';

  const form = document.createElement('form');
  form.noValidate = true;

  formData.data.forEach((field) => {
    const fieldEl = createField(field, document);
    form.append(fieldEl);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  block.append(form);
}
