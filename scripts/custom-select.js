function decorateCustomSelect(selectWrapper) {
  const nativeSelect = selectWrapper.querySelector('select');
  if (!nativeSelect) return;

  nativeSelect.style.display = 'none';

  const trigger = document.createElement('div');
  trigger.className = 'custom-select-trigger';

  const valueSpan = document.createElement('span');
  valueSpan.className = 'custom-select-value';
  valueSpan.textContent = nativeSelect.options[nativeSelect.selectedIndex]?.text || '';

  const iconWrap = document.createElement('span');
  iconWrap.className = 'custom-select-icon';
  iconWrap.innerHTML = '<svg class="icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
    + '<svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  trigger.append(valueSpan, iconWrap);

  const dropdown = document.createElement('div');
  dropdown.className = 'custom-select-dropdown';

  const searchWrap = document.createElement('div');
  searchWrap.className = 'custom-select-search';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search';
  searchWrap.append(searchInput);

  const list = document.createElement('div');
  list.className = 'custom-select-list';

  function closeDropdown() {
    trigger.classList.remove('open');
    dropdown.classList.remove('visible');
  }

  function buildOptions(filter = '') {
    list.innerHTML = '';
    [...nativeSelect.options].forEach((opt) => {
      if (filter && !opt.text.toLowerCase().includes(filter.toLowerCase())) return;
      const optDiv = document.createElement('div');
      optDiv.className = 'custom-select-option';
      if (opt.selected) optDiv.classList.add('selected');
      optDiv.textContent = opt.text;
      optDiv.dataset.value = opt.value;
      optDiv.addEventListener('click', () => {
        nativeSelect.value = opt.value;
        nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
        valueSpan.textContent = opt.text;
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

  searchInput.addEventListener('input', () => {
    buildOptions(searchInput.value);
  });

  searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (!selectWrapper.contains(e.target)) closeDropdown();
  });

  dropdown.append(searchWrap, list);
  selectWrapper.append(trigger, dropdown);
}

const productImages = {
  puros_allograft_customzied_block: '/forms/images/puros-allograft.jpeg',
  peek_accuraplate: '/forms/images/peek-accuraplate.jpeg',
  titanium_accuramesh: '/forms/images/titanium-accuramesh.jpeg',
  peek_accuramesh: '/forms/images/peek-accuramesh.jpeg',
};

function decorateProductRadios() {
  const radios = document.querySelectorAll('.form .radio-wrapper.field-opt-article:not([data-product-decorated])');
  radios.forEach((wrapper) => {
    wrapper.dataset.productDecorated = 'true';
    const input = wrapper.querySelector('input[type="radio"]');
    if (!input) return;

    const imgSrc = productImages[input.value];
    if (!imgSrc) return;

    const imgContainer = document.createElement('div');
    imgContainer.className = 'product-image';
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = wrapper.querySelector('label')?.textContent || '';
    img.loading = 'lazy';
    imgContainer.append(img);
    wrapper.append(imgContainer);

    function updateSelected() {
      document.querySelectorAll('.form .radio-wrapper.field-opt-article').forEach((rw) => {
        rw.classList.remove('product-selected');
      });
      const checked = document.querySelector('.form .radio-wrapper.field-opt-article input:checked');
      if (checked) checked.closest('.radio-wrapper').classList.add('product-selected');
    }

    input.addEventListener('change', updateSelected);
  });

  const allRadios = document.querySelectorAll('.form .radio-wrapper.field-opt-article');
  const lastRadio = allRadios[allRadios.length - 1];
  if (lastRadio && !document.querySelector('.product-footnote')) {
    const footnote = document.createElement('p');
    footnote.className = 'product-footnote';
    footnote.textContent = '*Product clearance and availability may be limited to certain countries/regions.';
    lastRadio.after(footnote);
  }
}

function decorateFileUpload() {
  const fileWrapper = document.querySelector('.form .file-wrapper.decorated:not([data-upload-decorated])');
  if (!fileWrapper) return;
  fileWrapper.dataset.uploadDecorated = 'true';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.name = 'files[]';
  fileInput.accept = '.pdf,.zip,.rar';
  fileInput.style.display = 'none';
  fileWrapper.append(fileInput);

  const selectBtn = document.createElement('button');
  selectBtn.type = 'button';
  selectBtn.className = 'file-select-btn';
  selectBtn.textContent = 'Select files ...';
  selectBtn.addEventListener('click', () => fileInput.click());

  const desc = fileWrapper.querySelector('.field-description');
  if (desc) {
    desc.after(selectBtn);
  } else {
    fileWrapper.prepend(selectBtn);
  }

  if (document.querySelector('.upload-legal-text')) return;
  const legalBlock = document.createElement('div');
  legalBlock.className = 'upload-legal-text';
  legalBlock.innerHTML = '<p><strong>By clicking the corresponding box below and using this site https://cuztomgraft.zimvie.com or uploading materials to this site, you:</strong></p>'
    + '<p><em>ZimVie Dental Terms and Conditions <a href="https://www.zimvie.eu/content/dam/zimvie-corporate/en/customer-service/t-n-c/TC_Sale_Dental_UK.pdf">https://www.zimvie.eu/content/dam/zimvie-corporate/en/customer-service/t-n-c/TC_Sale_Dental_UK.pdf</a></em></p>'
    + '<p><em>AccuraMesh™ &amp; AccuraPlate™ Products Terms and Conditions <a href="https://www.zimvie.eu/content/dam/zimvie-corporate/en/customer-service/accuramesh/Accuramesh_Terms_and_Conditions_UK_EN.pdf">https://www.zimvie.eu/content/dam/zimvie-corporate/en/customer-service/accuramesh/Accuramesh_Terms_and_Conditions_UK_EN.pdf</a></em></p>'
    + '<p><em>Agree to abide by the ZimVie Dental Terms and Conditions and AccuraMesh™ &amp; AccuraPlate™ Products Terms and Conditions set forth in this site. Confirm that the patient\'s consent to transmit patient DICOM information to the manufacturer for the exclusive purpose of designing and producing a custom-made medical device has been obtained. Furthermore, I understand that the DICOM information shall be transmitted with a pseudonymous patient ID. If it is transmitted with identifiable patient personal data, the patient has given his/her explicit informed consent. *Agree to comply with all obligations under the General Data Protection Regulation ("GDPR"), especially with respect to the protection of personal data as well as the processing thereof and the respective data subject\'s rights.</em></p>';

  const firstCheckbox = fileWrapper.parentElement.querySelector('.checkbox-wrapper');
  if (firstCheckbox) {
    firstCheckbox.before(legalBlock);
  } else {
    fileWrapper.after(legalBlock);
  }
}

function addRequiredFieldsNote() {
  if (document.querySelector('.required-fields-note')) return;
  const uploadSection = document.querySelector('.form .plain-text-wrapper.field-section-upload');
  if (!uploadSection) return;
  const note = document.createElement('p');
  note.className = 'required-fields-note';
  note.textContent = '* Required fields';
  uploadSection.before(note);
}

function initCustomSelects() {
  const observer = new MutationObserver(() => {
    const selects = document.querySelectorAll('.form .drop-down-wrapper select:not([data-custom-decorated])');
    selects.forEach((select) => {
      select.dataset.customDecorated = 'true';
      decorateCustomSelect(select.closest('.drop-down-wrapper'));
    });
    decorateProductRadios();
    addRequiredFieldsNote();
    decorateFileUpload();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const existingSelects = document.querySelectorAll('.form .drop-down-wrapper select:not([data-custom-decorated])');
  existingSelects.forEach((select) => {
    select.dataset.customDecorated = 'true';
    decorateCustomSelect(select.closest('.drop-down-wrapper'));
  });
  decorateProductRadios();
  addRequiredFieldsNote();
  decorateFileUpload();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(initCustomSelects, 1000));
} else {
  setTimeout(initCustomSelects, 1000);
}
