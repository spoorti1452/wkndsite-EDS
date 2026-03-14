export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const textContent = row.textContent.toLowerCase();
    
    if (textContent.includes('wanderlust')) {
      row.classList.add('definition-section');
      
      // Get the inner div
      const contentHolder = row.querySelector(':scope > div');
      
      // If Da.live wrapped it in <pre><code>, we extract the text to clean it
      const rawText = row.textContent.trim();
      const lines = rawText.split('\n').filter(line => line.trim() !== '');

      // Rebuild the structure purely for styling
      if (lines.length >= 3) {
        contentHolder.innerHTML = `
          <p class="def-title">${lines[0]}</p>
          <p class="def-desc">${lines[1]}</p>
          <p class="pos-italic">${lines[2]}</p>
        `;
      }
    }
  });
}