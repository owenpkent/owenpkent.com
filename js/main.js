// Theme toggle and mobile nav
(function () {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function setTheme(mode) {
    if (mode === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    localStorage.setItem('theme', mode);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    }));
  }

  // Parallax: subtle background motion on elements with [data-parallax]
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || window.pageYOffset;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
        const offset = reduceMotion ? 0 : y * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
        el.style.willChange = 'transform';
      });
      ticking = false;
    });
  }

  if (parallaxEls.length) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Kinetic typography (per-letter) using Web Animations API
  (function () {
    const ktEls = Array.from(document.querySelectorAll('#heroTitle .kt'));
    const nameEl = document.getElementById('nameMark');
    if (!ktEls.length) return;

    // Reduced motion: show instantly
    if (reduceMotion) {
      ktEls.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // (pulse click handler removed from here; added within waveform block)

    // Prepare title spans
    ktEls.forEach(el => {
      el.style.display = 'inline-block';
      if (el === nameEl) {
        // Important: keep the name container visible; only letters animate
        el.style.opacity = '1';
        el.style.transform = 'none';
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(14px)';
      }
    });

    // Split name into per-letter spans
    if (nameEl && !nameEl.dataset.split) {
      const text = nameEl.textContent;
      const frag = document.createDocumentFragment();
      [...text].forEach(ch => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.className = 'kt-ch';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(24px) rotate(-8deg)';
        frag.appendChild(span);
      });
      nameEl.textContent = '';
      nameEl.appendChild(frag);
      nameEl.dataset.split = '1';
    }

    const easing = 'cubic-bezier(0.22, 1, 0.36, 1)'; // easeOutCubic-like

    // Animate non-name parts
    ktEls.forEach((el, i) => {
      if (el === nameEl) return;
      el.animate([
        { opacity: 0, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 500,
        delay: i * 120,
        easing,
        fill: 'forwards'
      });
    });

    // Animate name letters
    if (nameEl) {
      const letters = Array.from(nameEl.querySelectorAll('.kt-ch'));
      letters.forEach((ch, i) => {
        ch.animate([
          { opacity: 0, transform: 'translateY(24px) rotate(-8deg)' },
          { opacity: 1, transform: 'translateY(0) rotate(0deg)' }
        ], {
          duration: 700,
          delay: 200 + i * 40,
          easing,
          fill: 'forwards'
        });
      });

      // Gentle hover wiggle
      const hover = () => {
        letters.forEach((ch, i) => {
          ch.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-2px)' },
            { transform: 'translateY(0)' }
          ], { duration: 300, delay: i * 8, easing: 'ease-out' });
        });
      };
      nameEl.addEventListener('mouseenter', () => { if (!reduceMotion) hover(); });
      nameEl.addEventListener('focus', () => { if (!reduceMotion) hover(); });
    }
  })();
  
  // Abstract Joy Division–style waveform (Canvas)
  ;(function () {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const html = document.documentElement;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, animId = 0, running = false, isDark = html.classList.contains('dark');
    let t = 0, tPrev = 0;
    let prevYY = [];
    // Click pulses disabled

    const palette = {
      light: { line: 'rgba(0,191,179,1.00)', bg: 'rgba(255,255,255,0.06)' }, // subtle wash
      dark:  { line: 'rgba(255,111,175,1.00)', bg: 'rgba(0,0,0,0.09)' }      // subtle wash
    };

    const mouse = { x: 0, y: 0, active: false };
    // Inertial cursor position (momentum)
    let mx = 0, my = 0, vx = 0, vy = 0;
    function updateTheme() { isDark = html.classList.contains('dark'); }
    const mo = new MutationObserver(updateTheme);
    mo.observe(html, { attributes: true, attributeFilter: ['class'] });

    function resize() {
      const parent = canvas.parentElement || canvas;
      const rect = parent.getBoundingClientRect();
      let cw = Math.floor(rect.width || parent.clientWidth || window.innerWidth);
      let ch = Math.floor(rect.height || parent.clientHeight || canvas.offsetHeight || 480);
      if (!cw || cw < 1) cw = Math.floor(window.innerWidth);
      if (!ch || ch < 1) ch = Math.floor(window.innerHeight * 0.6); // fallback to 60vh
      // ensure CSS size explicitly set so rects are stable
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = Math.max(1, Math.floor(cw * DPR));
      canvas.height = Math.max(1, Math.floor(ch * DPR));
      w = cw; h = ch;
      // clear any debug styling
      canvas.style.outline = '';
      canvas.style.background = '';
    }

    // Layered sines for organic baseline
    function baseOffset(x, rowIdx, rows, time) {
      const u = x; // 0..1
      const r = rowIdx / Math.max(1, rows - 1);
      const speed = 0.09; // even slower base motion for rolling feel
      const amp = 22 * (1.0 - r) + 8;          // a bit larger to emphasize crests
      const a = Math.sin(2*Math.PI*(u*1.0 + time*speed + r*0.15));
      const b = Math.sin(2*Math.PI*(u*2.3 - time*speed*1.4 + r*0.27));
      const c = Math.sin(2*Math.PI*(u*3.7 + time*speed*0.9 - r*0.33));
      return amp * (0.42*a + 0.35*b + 0.23*c);
    }

    // Mouse repulsion bump (pushes lines away from inertial cursor)
    function mouseBump(x, y) {
      if (!mouse.active) return 0;
      const dx = x - mx;
      const dy = y - my;
      const d2 = dx*dx + dy*dy;
      const sigma = Math.min(w, h) * 0.30; // broader radius so more lines are affected
      const s2 = sigma * sigma;
      const gauss = Math.exp(-d2 / (2*s2)); // 0..1
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      const dirY = dy / len; // away from cursor vertically
      // Include velocity bias to continue motion direction (further reduced to avoid spikes)
      const vlen = Math.sqrt(vx*vx + vy*vy) || 1;
      const vyNorm = Math.max(-1, Math.min(1, vy / 700));
      const bias = 0.90*dirY + 0.10*vyNorm;
      const strength = 22; // broad, gentle push (px)
      return gauss * bias * strength; // no extra exponent -> wider, less pointy
    }

    // Click pulse bump disabled
    function clickBump(x, y, dt) {
      return 0;
    }

    function step(now) {
      if (reduceMotion) return;
      t = now * 0.001;
      const dt = Math.max(0.001, Math.min(0.05, (now - (tPrev || now)) / 1000));
      tPrev = now;
      const theme = isDark ? palette.dark : palette.light;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, w, h);

      // Update inertial cursor (momentum)
      const follow = 0.06;         // much lower gain -> slow follow
      const friction = 0.965;      // higher damping -> long, smooth tail
      // If never initialized, snap first
      if (mx === 0 && my === 0) { mx = mouse.x; my = mouse.y; }
      if (mouse.active) {
        vx += (mouse.x - mx) * follow;
        vy += (mouse.y - my) * follow;
      }
      mx += vx * (dt * 60);
      my += vy * (dt * 60);
      vx *= friction;
      vy *= friction;

      const rows = Math.max(22, Math.floor(h / 16)); // more lines, slightly denser
      const cols = Math.max(80, Math.floor(w / 10));
      const top = h * 0.12;
      const bottom = h * 0.88;
      const lineWidth = 2.0; // tuned subtle thickness

      ctx.strokeStyle = theme.line;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // perspective taper mapping - compress spacing toward top/bottom, brighter center
      const perspectiveMap = (v) => 0.5 + (v - 0.5) * 0.72; // 0.72 factor compresses edges

      // prepare buffers
      const rowsYY = new Array(rows);
      const rowsXX = new Array(rows);
      const prevComp = ctx.globalCompositeOperation;

      // ensure temporal buffers sized
      if (prevYY.length !== rows) prevYY = new Array(rows);

      // First pass: compute each row's points with mouse + click bumps and per-row smoothing
      for (let r = 0; r < rows; r++) {
        const v = r / Math.max(1, rows - 1);
        const vp = perspectiveMap(v);
        const yBase = top + (bottom - top) * vp;
        const depth = 1.0 - Math.abs(2*vp - 1.0); // center brighter
        ctx.globalAlpha = 0.60 + 0.40 * depth; // set when drawing later

        // compute row points to enable crest glow detection
        const yy = new Array(cols + 1);
        const xx = new Array(cols + 1);
        for (let c = 0; c <= cols; c++) {
          const u = c / cols; // 0..1
          const x = u * w;
          const y = yBase + baseOffset(u, r, rows, t);
          const m = mouseBump(x, y);
          const pb = clickBump(x, y, dt);
          xx[c] = x;
          yy[c] = y + m + pb;
        }
        // lateral x-smoothing to avoid pointy tips
        if (cols >= 2) {
          const k = 0.22; // neighbor weight
          const sm = new Array(cols + 1);
          sm[0] = yy[0];
          for (let c = 1; c < cols; c++) {
            sm[c] = yy[c]*(1-2*k) + yy[c-1]*k + yy[c+1]*k;
          }
          sm[cols] = yy[cols];
          for (let c = 0; c <= cols; c++) yy[c] = sm[c];
        }

        // temporal smoothing for rolling feel
        const smooth = 0.85; // previous weight
        const prev = prevYY[r];
        if (prev && prev.length === cols + 1) {
          for (let c = 0; c <= cols; c++) {
            yy[c] = prev[c] * smooth + yy[c] * (1 - smooth);
          }
        }
        prevYY[r] = yy.slice();
        rowsYY[r] = yy;
        rowsXX[r] = xx;
      }

      // Second pass: cross-row blending to spread disturbance vertically
      const kr = 0.18; // neighbor row weight
      const blendedYY = new Array(rows);
      for (let r = 0; r < rows; r++) {
        const yy = rowsYY[r];
        const up = r > 0 ? rowsYY[r-1] : yy;
        const dn = r < rows-1 ? rowsYY[r+1] : yy;
        const out = new Array(cols + 1);
        for (let c = 0; c <= cols; c++) {
          out[c] = yy[c]*(1-2*kr) + up[c]*kr + dn[c]*kr;
        }
        blendedYY[r] = out;
      }

      // Draw pass (with glow)
      try {
      for (let r = 0; r < rows; r++) {
        const v = r / Math.max(1, rows - 1);
        const vp = perspectiveMap(v);
        const depth = 1.0 - Math.abs(2*vp - 1.0);
        const xx = rowsXX[r];
        const yy = blendedYY[r];

        // ensure normal compositing for the main stroke
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowColor = isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)';
        ctx.shadowBlur = 1;
        ctx.globalAlpha = 1.0; // main stroke fully opaque for clarity
        ctx.beginPath();
        ctx.moveTo(xx[0], yy[0]);
        for (let c = 1; c <= cols; c++) ctx.lineTo(xx[c], yy[c]);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // crest glow
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineWidth = lineWidth * 1.6;
        ctx.globalAlpha = 0.05 + 0.14 * depth;
        ctx.beginPath();
        let drawing = false;
        for (let c = 1; c < cols; c++) {
          const k2 = yy[c-1] - 2*yy[c] + yy[c+1];
          if (k2 < -1.4) {
            if (!drawing) { ctx.moveTo(xx[c-1], yy[c-1]); drawing = true; }
            ctx.lineTo(xx[c], yy[c]);
          } else if (drawing) {
            ctx.lineTo(xx[c], yy[c]);
            drawing = false;
          }
        }
        if (drawing) ctx.stroke(); else ctx.stroke();
        ctx.restore();
      }
      } catch (err) {
        console.error('[wave] draw error', err);
        ctx.save();
        ctx.fillStyle = 'rgba(255,0,0,0.8)';
        ctx.font = '12px sans-serif';
        ctx.fillText('wave error: ' + (err && err.message ? err.message : 'unknown'), 10, 20);
        ctx.restore();
      } finally {
        ctx.globalCompositeOperation = prevComp;
        ctx.globalAlpha = 1;
      }
      animId = requestAnimationFrame(step);
    }

    function start() { if (reduceMotion || running) return; running = true; animId = requestAnimationFrame(step); }
    function stop() { running = false; cancelAnimationFrame(animId); }

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
    }, { passive: true });
    window.addEventListener('mouseleave', () => { mouse.active = false; }, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });

    // Init
    resize();
    if (typeof console !== 'undefined') console.log('[wave] init', { w, h, dpr: DPR });
    if (!reduceMotion) start(); else {
      // Static snapshot
      const theme = isDark ? palette.dark : palette.light;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, w, h);
      const rows = Math.max(18, Math.floor(h / 18));
      const cols = Math.max(80, Math.floor(w / 10));
      const top = h * 0.15;
      const bottom = h * 0.85;
      ctx.strokeStyle = theme.line;
      ctx.lineWidth = 1.6;
      for (let r = 0; r < rows; r++) {
        const v = r / Math.max(1, rows - 1);
        const yBase = top + (bottom - top) * v;
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const u = c / cols;
          const x = u * w;
          const y = yBase + baseOffset(u, r, rows, 0.0);
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
  })();
})();
