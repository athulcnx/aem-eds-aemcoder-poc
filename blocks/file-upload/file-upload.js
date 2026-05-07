export default function decorate(block) {
  const rows = [...block.children];
  const heading = block.querySelector('h3, h4, h2');
  const headingText = heading?.textContent || '';

  const fieldName = block.dataset.fieldName || 'files[]';
  const acceptFormats = block.dataset.acceptFormats || '.pdf,.zip,.rar';
  const multiple = block.dataset.multiple !== 'false';
  const required = block.dataset.required !== 'false';
  const submitLabel = block.dataset.submitLabel || 'Submit Form';

  const instructionsRow = rows.find((r) => r.querySelector('[data-field="instructions"]'));
  const instructions = instructionsRow?.innerHTML || '';

  const legalRow = rows.find((r) => r.querySelector('[data-field="legalText"]'));
  const legalText = legalRow?.innerHTML || '';

  const consentItems = rows.slice(1).filter((row) => {
    const cols = [...row.children];
    return cols.length >= 3 && !row.querySelector('[data-field]');
  }).map((row) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent.trim() || '';
    const consentFieldName = cols[1]?.textContent.trim() || '';
    const value = cols[2]?.textContent.trim() || '';
    const consentRequired = cols[3]?.textContent.trim() === 'true';
    const linkText = cols[4]?.textContent.trim() || '';
    const linkHref = cols[5]?.textContent.trim() || '';
    return {
      label, fieldName: consentFieldName, value, required: consentRequired, linkText, linkHref,
    };
  });

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'file-upload-wrapper';

  if (headingText) {
    const h = document.createElement('h3');
    h.textContent = headingText;
    wrapper.append(h);
  }

  if (instructions) {
    const instructionsEl = document.createElement('div');
    instructionsEl.className = 'file-upload-instructions';
    instructionsEl.innerHTML = instructions;
    wrapper.append(instructionsEl);
  }

  const fileInputWrapper = document.createElement('div');
  fileInputWrapper.className = 'file-upload-input-wrapper';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.name = fieldName;
  fileInput.accept = acceptFormats;
  if (multiple) fileInput.multiple = true;
  if (required) {
    fileInput.required = true;
    fileInput.setAttribute('aria-required', 'true');
  }

  const fileLabel = document.createElement('label');
  fileLabel.className = 'file-upload-label';
  fileLabel.textContent = `Select files (${acceptFormats})`;
  fileLabel.append(fileInput);

  const fileList = document.createElement('div');
  fileList.className = 'file-upload-file-list';

  fileInput.addEventListener('change', () => {
    fileList.textContent = '';
    [...fileInput.files].forEach((file) => {
      const item = document.createElement('div');
      item.className = 'file-upload-file-item';
      item.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      fileList.append(item);
    });
  });

  fileInputWrapper.append(fileLabel);
  fileInputWrapper.append(fileList);
  wrapper.append(fileInputWrapper);

  if (legalText) {
    const legalEl = document.createElement('div');
    legalEl.className = 'file-upload-legal';
    legalEl.innerHTML = legalText;
    wrapper.append(legalEl);
  }

  if (consentItems.length) {
    const consentGroup = document.createElement('div');
    consentGroup.className = 'file-upload-consent-group';

    consentItems.forEach(({
      label, fieldName: fname, value, required: req, linkText, linkHref,
    }) => {
      const consentWrapper = document.createElement('label');
      consentWrapper.className = 'file-upload-consent-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = fname;
      checkbox.value = value;
      if (req) {
        checkbox.required = true;
        checkbox.setAttribute('aria-required', 'true');
      }

      const labelSpan = document.createElement('span');
      if (linkText && linkHref) {
        const anchor = document.createElement('a');
        anchor.href = linkHref;
        anchor.textContent = linkText;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        labelSpan.textContent = label.replace(linkText, '');
        labelSpan.append(anchor);
      } else {
        labelSpan.textContent = label;
      }

      consentWrapper.append(checkbox);
      consentWrapper.append(labelSpan);
      consentGroup.append(consentWrapper);
    });

    wrapper.append(consentGroup);
  }

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'file-upload-submit';
  submitBtn.textContent = submitLabel;
  wrapper.append(submitBtn);

  block.append(wrapper);
}
