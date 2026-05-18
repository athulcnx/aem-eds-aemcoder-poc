export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const helpText = rows[0]?.querySelector('div')?.textContent?.trim() || '';
  const buttonLabel = rows[1]?.querySelector('div')?.textContent?.trim() || 'Select files ...';

  block.innerHTML = '';

  if (helpText) {
    const help = document.createElement('p');
    help.className = 'upload-help-text';
    help.textContent = helpText;
    block.append(help);
  }

  const input = document.createElement('input');
  input.type = 'file';
  input.className = 'upload-input';
  input.style.display = 'none';
  input.multiple = true;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'upload-button';
  btn.textContent = buttonLabel;
  btn.addEventListener('click', () => input.click());

  block.append(input, btn);
}
