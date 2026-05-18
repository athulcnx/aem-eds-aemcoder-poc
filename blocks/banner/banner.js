export default function decorate(block) {
  const img = block.querySelector('img');
  if (img) {
    img.classList.add('banner-image');
  }
}
