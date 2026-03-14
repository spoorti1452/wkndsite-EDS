/*export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row, index) => {
    if (index === 0) {
      // The "aside" label/header from the table
      row.classList.add('aside-heading');
    } else {
      // The content rows
      row.classList.add('aside-item');
    }
  });
}
*/
export default function decorate(block) {
  const rows = [...block.children];
  
  rows.forEach((row, index) => {
    if (index === 0) {
      row.classList.add('aside-header');
      // Ensure the text inside is wrapped in a strong tag if not already
      const headerText = row.querySelector('div:last-child');
      if (headerText && !headerText.querySelector('strong')) {
        headerText.innerHTML = `<strong>${headerText.innerText}</strong>`;
      }
    } else {
      row.classList.add('aside-item');
      const content = row.querySelector('div:last-child');
      if (content) {
        content.classList.add('aside-item-content');
      }
      // Remove empty columns
      const firstCol = row.querySelector('div:first-child');
      if (firstCol && firstCol !== content) firstCol.remove();
    }
  });
}