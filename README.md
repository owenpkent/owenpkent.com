# Owen P Kent - Personal Website

A modern, responsive personal website built with HTML, Tailwind CSS, and vanilla JavaScript featuring animated particle backgrounds and frosted glass design elements.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **Dark/Light Mode**: Automatic theme detection with manual toggle support
- **Animated Background**: Custom particle system with connected nodes
- **Frosted Glass UI**: Modern backdrop blur effects for content areas
- **Contact Form**: Netlify-integrated contact form with spam protection
- **Social Links**: Direct links to LinkedIn, YouTube, Twitch, and Instagram
- **Performance Optimized**: Production-ready Tailwind CSS build system

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with accessibility features
- **Tailwind CSS**: Utility-first CSS framework with custom color palette
- **Vanilla JavaScript**: Lightweight particle animation and theme management
- **Netlify Forms**: Contact form handling
- **Node.js**: Build toolchain for CSS compilation

## 🎨 Design System

### Custom Color Palette
- **sun**: `#FFE85B` - Bright accent color
- **palm**: `#00A68C` - Primary green
- **wave**: `#00BFB3` - Secondary teal
- **surf**: `#FF6FAF` - Pink accent
- **sky**: `#FBB6CE` - Light pink
- **sand**: `#F9E4CC` - Warm beige
- **charcoal**: `#2E2E2E` - Dark text
- **lightSurface**: `#FFFFFF` - Light background
- **darkSurface**: `#1E293B` - Dark background

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/owenpkent/owenpkent.com.git
   cd owenpkent.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build CSS**
   ```bash
   npm run build
   ```

4. **Open in browser**
   Open `index.html` in your preferred browser or serve with a local server.

## 📝 Development

### Available Scripts

- **`npm run build`**: Build production CSS (minified)
- **`npm run build-css`**: Build CSS in watch mode for development

### File Structure

```
├── index.html              # Main HTML file
├── js/
│   └── main.js             # JavaScript for particles and theme toggle
├── css/
│   └── styles.css          # Compiled Tailwind CSS (generated)
├── src/
│   └── input.css           # Source CSS with Tailwind directives
├── package.json            # Node.js dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

### Making Changes

1. **Styling Changes**: Edit `src/input.css` or modify `tailwind.config.js`
2. **Content Changes**: Edit `index.html`
3. **JavaScript Changes**: Edit `js/main.js`
4. **Rebuild CSS**: Run `npm run build` after changes

### Custom CSS Classes

- `.theme-transition`: Smooth color transitions for theme switching
- `#tsparticles`: Particle animation container styling

## 🎯 Features Breakdown

### Particle Animation System
- Custom canvas-based particle system
- Responsive to screen size
- Theme-aware colors (adapts to dark/light mode)
- Optimized performance with requestAnimationFrame

### Theme Management
- Respects system preference (`prefers-color-scheme`)
- Persistent user selection in localStorage
- Smooth transitions between themes
- Manual toggle button in header

### Contact Form
- Netlify Forms integration
- Honeypot spam protection
- Accessible form labels and validation
- Responsive design

### Social Media Integration
- Platform-specific brand colors
- Consistent button sizing
- Mobile-optimized 2x2 grid layout
- External link best practices

## 🌐 Deployment

This site is designed for static hosting and works well with:
- **Netlify** (recommended for form handling)
- **Vercel**
- **GitHub Pages**
- **Cloudflare Pages**

### Build Process for Deployment

1. Run `npm run build` to generate production CSS
2. Commit the generated `css/styles.css` file
3. Deploy the entire repository to your hosting platform

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal website, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About

Built by Owen P Kent - entrepreneur, co-founder of [ATDev](https://assistivetech.dev/), filmmaker, UC Berkeley graduate, ambient electronic music producer, and disability rights advocate.

### Connect
- [LinkedIn](https://www.linkedin.com/in/owenpkent)
- [YouTube](https://www.youtube.com/@owenpkent)
- [Twitch](https://www.twitch.tv/owenpkent)
- [Instagram](https://www.instagram.com/owenpkent)

---

*Last updated: September 2025*
