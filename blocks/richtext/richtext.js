export default function decorate(block) {
  const content = block.querySelector('div > div');
  if (content) {
    block.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'richtext-content';
    wrapper.innerHTML = content.innerHTML;
    block.append(wrapper);
  }
}
