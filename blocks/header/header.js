import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  while (fragment && fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // --- TOP BAR ---
  const topBarLinks = document.createElement('div');
  topBarLinks.classList.add('nav-topbar-links');
  topBarLinks.innerHTML = `
    <button id="header-signin-button" class="top-link">SIGN IN</button>
    <a href="/" class="top-link">HOME</a>
  `;
  nav.prepend(topBarLinks);

  // --- HAMBURGER ---
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = '<div class="hamburger-icon"><span></span><span></span><span></span></div>';

  hamburger.addEventListener('click', () => {
    const isExpanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Place hamburger before brand for the 1-row layout
  nav.insertBefore(hamburger, nav.querySelector('.nav-brand'));

  // --- SEARCH BAR ---
  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    navTools.innerHTML = `
      <div class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" placeholder="SEARCH">
      </div>
    `;
  }

  // --- SIGN IN MODAL ---
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('signin-overlay');
  modalOverlay.innerHTML = `
    <div class="signin-modal">
      <button class="close-modal">&times;</button>
      <h2 class="signin-title">Sign In</h2>
      <div class="yellow-line"></div>
      <p class="welcome-text">Welcome Back</p>
      <form>
        <input type="text" placeholder="USERNAME">
        <input type="password" placeholder="PASSWORD">
        <a href="#" class="forgot-link">FORGOT YOUR PASSWORD?</a>
        <button type="submit" class="signin-submit">SIGN IN</button>
      </form>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  const signInBtn = nav.querySelector('#header-signin-button');
  if (signInBtn) signInBtn.addEventListener('click', () => modalOverlay.classList.add('active'));

  const closeBtn = modalOverlay.querySelector('.close-modal');
  if (closeBtn) closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}