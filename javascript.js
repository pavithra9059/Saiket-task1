<script>
// Custom cursor
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
setInterval(() => {
  tx += (mx - tx) * 0.15;
  ty += (my - ty) * 0.15;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
}, 16);

// Stars background
const starsDiv = document.getElementById('stars');
for (let i = 0; i < 200; i++) {
  const s = document.createElement('div');
  const size = Math.random() * 3 + 0.5;
  const colors = ['#00f5ff','#ff00aa','#9d00ff','#ffea00','#00ff88','#fff'];
  const c = colors[Math.floor(Math.random() * colors.length)];
  s.style.cssText = `
    position:absolute; border-radius:50%;
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%; top:${Math.random()*100}%;
    background:${c}; opacity:${Math.random()*0.7+0.1};
    animation: twinkle ${Math.random()*3+2}s ease-in-out infinite;
    animation-delay: ${Math.random()*5}s;
  `;
  starsDiv.appendChild(s);
}
const twinkleStyle = document.createElement('style');
twinkleStyle.textContent = '@keyframes twinkle { 0%,100%{opacity:0.1;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }';
document.head.appendChild(twinkleStyle);

// Floating particles
const colors = ['#00f5ff','#ff00aa','#9d00ff','#ffea00','#00ff88'];
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 6 + 2;
  const c = colors[i % colors.length];
  p.style.cssText = `
    width:${size}px; height:${size}px;
    background:${c};
    left:${Math.random()*100}%;
    opacity:0.6;
    animation-duration:${Math.random()*15+10}s;
    animation-delay:${Math.random()*10}s;
    box-shadow: 0 0 ${size*3}px ${c};
  `;
  document.body.appendChild(p);
}

// Canvas background - flowing waves
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let t = 0;
function drawWaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const waveColors = [
    'rgba(0,245,255,0.03)',
    'rgba(255,0,170,0.02)',
    'rgba(157,0,255,0.02)',
  ];
  for (let w = 0; w < 3; w++) {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x <= canvas.width; x += 5) {
      const y = canvas.height / 2 +
        Math.sin(x * 0.003 + t + w * 1.2) * 80 +
        Math.sin(x * 0.007 + t * 1.3 + w) * 40;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fillStyle = waveColors[w];
    ctx.fill();
  }
  t += 0.008;
  requestAnimationFrame(drawWaves);
}
drawWaves();

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = '1';
      el.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section > *:not(h2):not(.section-line)').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.7s ease';
  observer.observe(el);
});

// 3D tilt on hover
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateZ(10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.querySelector(a.getAttribute('href'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});
</script>
