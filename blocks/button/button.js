/* button.js */
export default function decorate(block) {
  const link = block.querySelector('a');
  if (link) {
    // Create a container to handle the alignment
    const container = document.createElement('div');
    container.className = 'button-container';

    // Move the link into the container
    link.parentNode.insertBefore(container, link);
    container.appendChild(link);

    // Ensure the block itself doesn't force centering
    block.style.textAlign = 'left';
  }
}
