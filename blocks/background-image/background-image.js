export default function decorate(block) {
  const img = block.querySelector('img');
  if (img) {
    const section = block.closest('.section');
    if (section) {
      section.style.backgroundImage = `url('${img.src}')`;
      section.style.backgroundSize = 'cover';
      section.style.backgroundPosition = 'center';
      section.style.backgroundRepeat = 'no-repeat';
    }
    block.style.display = 'none';
  }
}
