export default function decorate(block) {
  const text = block.querySelector('div > div')?.textContent?.trim();
  if (text) {
    block.innerHTML = `<h3 class="section-title-heading">${text}</h3>`;
  }
}
