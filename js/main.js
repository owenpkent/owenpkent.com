// Main client-side script
// - Handles dark mode toggle
// - Sets current year in footer

(function () {
  // Set current year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Theme toggle logic
  var btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var html = document.documentElement;
    var isDark = html.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
      // ignore storage failures (e.g., privacy mode)
    }
  });
})();
