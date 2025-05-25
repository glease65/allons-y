// js/theme-switcher.js
document.addEventListener('DOMContentLoaded', () => {
    const switcher = document.getElementById('theme-switcher');
    const themeLink = document.getElementById('theme-stylesheet');
    // Dynamically find the CSS directory
    const cssHref = themeLink.getAttribute('href');
    const cssDir = cssHref.substring(0, cssHref.lastIndexOf('/'));
  
    // Apply saved theme
    const savedFile = localStorage.getItem('theme');
    if (savedFile) {
      themeLink.setAttribute('href', `${cssDir}/${savedFile}`);
      document.body.classList.add(savedFile.replace('.css', ''));
    }
  
    switcher.addEventListener('click', () => {
      const currentFile = themeLink.getAttribute('href').split('/').pop();
      const nextFile =
        currentFile === 'refinement-theme.css'
          ? 'expanse-theme.css'
          : 'refinement-theme.css';
  
      themeLink.setAttribute('href', `${cssDir}/${nextFile}`);
      document.body.classList.toggle('refinement-theme');
      document.body.classList.toggle('expanse-theme');
      localStorage.setItem('theme', nextFile);
  
      document.body.classList.add('theme-transition');
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 500);
    });
  });
  