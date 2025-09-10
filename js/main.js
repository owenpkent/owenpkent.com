// Main client-side script
// - Sets current year in footer
// - Creates custom canvas particles background
// - Handles dark mode toggle

(function () {
  // Set current year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Custom particles system
  var canvas, ctx, particles = [], animationId;
  var particleCount = 50;

  function isDarkMode() {
    return document.documentElement.classList.contains('dark');
  }

  function createCanvas() {
    var container = document.getElementById('tsparticles');
    if (!container) return;

    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    
    container.innerHTML = '';
    container.appendChild(canvas);
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    console.log('[particles] canvas created:', canvas.width + 'x' + canvas.height);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Particle(x, y) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 3 + 1;
  }

  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  };

  function initParticles() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawParticles() {
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    var dark = isDarkMode();
    var particleColor = dark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)';
    var lineColor = dark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';

    // Draw connections
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    ctx.fillStyle = particleColor;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.update();
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animate() {
    drawParticles();
    animationId = requestAnimationFrame(animate);
  }

  function startParticles() {
    if (animationId) cancelAnimationFrame(animationId);
    createCanvas();
    initParticles();
    animate();
  }

  function stopParticles() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Initialize particles
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startParticles);
  } else {
    startParticles();
  }

  // Handle window resize
  window.addEventListener('resize', function() {
    resizeCanvas();
  });

  // Theme toggle logic
  var btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var html = document.documentElement;
      var isDark = html.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {
        // ignore storage failures
      }
    });
  }
})();
