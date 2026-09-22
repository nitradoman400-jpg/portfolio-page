const totalImages = 18;
const imageInterval = 20;

const portraitPieces = document.querySelectorAll('.portrait-piece');
const portraitContainer = document.querySelector('.portrait-container');

if (portraitContainer) {

  // Mobile: Animation überspringen, alle Bilder sofort zeigen
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    portraitPieces.forEach(piece => piece.style.opacity = '1');
  } else {

    let completed = false;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function () {
      const rect = portraitContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollingDown = window.scrollY > lastScrollY;
      lastScrollY = window.scrollY;

      // Portrait unterhalb des Viewports (nach oben gescrollt) → Reset mit Fade
      if (rect.top > windowHeight) {
        if (completed) {
          completed = false;
          portraitPieces.forEach(piece => {
            piece.style.transition = 'opacity 0.6s ease';
            piece.style.opacity = '0';
          });
          setTimeout(() => {
            portraitPieces.forEach(piece => piece.style.transition = '');
          }, 600);
        } else {
          portraitPieces.forEach(piece => piece.style.opacity = '0');
        }
        return;
      }

      // Portrait oberhalb des Viewports (nach unten gescrollt) → sichtbar lassen
      if (rect.bottom < 0) {
        if (!completed) {
          completed = true;
          portraitPieces.forEach(piece => piece.style.opacity = '1');
        }
        return;
      }

      // Animation fertig → eingefroren lassen
      if (completed) return;

      // Nur beim Runterscrollen animieren
      if (!scrollingDown) return;

      const scrollAmount = (windowHeight - rect.top) - 400;
      const targetIndex = Math.min(
        Math.floor(scrollAmount / imageInterval),
        totalImages - 1
      );

      // Animation abgeschlossen
      if (targetIndex >= totalImages - 1) {
        completed = true;
        portraitPieces.forEach(piece => piece.style.opacity = '1');
        return;
      }

      portraitPieces.forEach(piece => {
        const order = parseInt(piece.getAttribute('data-order'));
        piece.style.opacity = order <= targetIndex ? '1' : '0';
      });

    }, { passive: true });

  }
}
