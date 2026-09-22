function fitTitle() {
  if (window.innerWidth > 768) return; // Nur auf Mobile
  
  const title = document.querySelector('.project-title h1');
  if (!title) return;

  // Schriftgrösse zuerst zurücksetzen damit wir vom Maximum starten
  title.style.fontSize = '';

  const lineHeight = parseFloat(getComputedStyle(title).lineHeight);
  let fontSize = parseFloat(getComputedStyle(title).fontSize);

  while (title.scrollHeight > lineHeight * 2 + 1 && fontSize > 12) {
    fontSize -= 0.5;
    title.style.fontSize = fontSize + 'px';
  }
}

window.addEventListener('load', fitTitle);
window.addEventListener('resize', fitTitle);