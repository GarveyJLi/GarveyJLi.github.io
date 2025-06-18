const glow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glow.style.top = `${mouseY}px`;
  glow.style.left = `${mouseX}px`;
  requestAnimationFrame(animateGlow);
}

animateGlow();
