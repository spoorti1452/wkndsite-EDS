export default function decorate(block) {
  // Extract the rows from the table
  const rows = [...block.children];

  // Clear the block to rebuild it cleanly
  block.textContent = '';

  rows.forEach((row, index) => {
    const content = row.querySelector('div:last-child');

    if (index === 0) { // Heading Row
      const h2 = document.createElement('h2');
      h2.textContent = content.textContent;
      block.append(h2);
    } else if (index === 1) { // Image Row
      const imageDiv = document.createElement('div');
      imageDiv.className = 'travelstory-image';
      imageDiv.innerHTML = content.innerHTML;
      block.append(imageDiv);
    } else if (index === 2) { // Text Row
      const textDiv = document.createElement('div');
      textDiv.className = 'travelstory-text';
      textDiv.innerHTML = content.innerHTML;
      block.append(textDiv);
    }
  });
}
