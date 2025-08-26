# Owen P Kent — Personal Website

A minimal, stable static site using HTML, JavaScript, and Tailwind CSS v3 via CDN. Includes a custom color palette, dark mode toggle, and accessible navigation.

## Tech
- HTML + JS
- Tailwind v3 via CDN (no build step)
- Inter font

## Structure
- `index.html` — homepage with Hero, About, Projects, Media/Links, Contact
- `js/main.js` — dark mode + mobile nav
- `assets/` — placeholder for images, media

## Customize
- Update links (YouTube, Twitch, OKStudio, ATDev, socials) in `index.html`
- Replace the favicon in `<head>` with your own file
- Adjust palette in the inline `tailwind.config` script within `index.html`

## Run locally
Just open `index.html` in your browser. For a simple local server:

- macOS/Linux: `python3 -m http.server 8080`
- Windows PowerShell: `python -m http.server 8080`

Then visit http://localhost:8080

## Deploy
Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages). No build required.

## Notes
- Dark mode persists using `localStorage` and respects system preference on first load.
- Colors available as Tailwind classes: `sun`, `palm`, `wave`, `surf`, `sky`, `sand`, `charcoal`, plus supporting neutrals and functional colors.
