export default function decorate(block) {
  const text = block.querySelector('div > div')?.textContent?.trim() || 'Submit';
  block.innerHTML = '';

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.className = 'submit-btn';
  btn.textContent = text;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
  });

  block.append(btn);
}
