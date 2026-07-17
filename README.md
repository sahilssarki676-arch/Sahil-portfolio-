# Sahil Sarki — Portfolio Website

A premium, fully responsive portfolio website for **Sahil Sarki**, Full Stack Web Developer & AI Automation Developer. Built with pure HTML, CSS, and JavaScript — no frameworks, GitHub Pages ready.

## 🚀 Live Preview

Open `index.html` directly in a browser, or serve locally:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## 📁 Project Structure

```
portfolio/
├── index.html          # All page markup and sections
├── style.css            # Design tokens, layout, and component styles
├── responsive.css       # Media queries for tablet & mobile
├── script.js             # All interactivity (nav, particles, typed, forms, etc.)
├── assets/
│   ├── favicon.svg
│   ├── profile.jpg              # replace with your photo
│   ├── project-*.jpg            # replace with real project screenshots
│   └── Sahil_Sarki_Resume.pdf   # add your resume for the download button
└── README.md
```

## ✨ Features

- Glassmorphism UI with a black / white / electric-blue theme
- Particle background (particles.js) + glowing gradient blobs
- Typing animation (Typed.js) rotating through role titles
- Signature "live terminal" hero visual
- Scroll-reveal animations (AOS)
- Animated skill bars and stat counters (vanilla JS + IntersectionObserver)
- Services, Projects, Why Choose Me, Testimonials, and FAQ accordion sections
- Booking form wired for EmailJS
- Dark/light mode toggle (persisted via localStorage)
- Custom cursor, scroll progress bar, back-to-top button
- Floating WhatsApp, Call, and "Book a Website" buttons
- Semantic HTML, keyboard-focus styles, `prefers-reduced-motion` support
- SEO meta tags + Open Graph tags

## 🔧 Setup Before Deploying

### 1. Replace placeholder assets
Add your real images to `/assets`:
- `profile.jpg` — your photo (falls back to an auto-generated avatar if missing)
- `project-furniture.jpg`, `project-electronics.jpg`, `project-restaurant.jpg`, `project-gym.jpg`, `project-realestate.jpg`, `project-interior.jpg`
- `Sahil_Sarki_Resume.pdf` — for the "Download Resume" button
- `og-image.jpg` — optional, for social sharing previews

### 2. Update project & live-demo links
In `index.html`, each `.project-card` has two `<a href="#">` placeholders — update these with your real GitHub repo and live demo URLs.

### 3. Connect the booking form (EmailJS)
1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Create an Email Service and an Email Template with fields matching the form's `name` attributes: `full_name`, `business_name`, `phone`, `email`, `website_type`, `budget`, `project_details`.
3. Open `script.js` and replace:
   ```js
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```
   with your actual EmailJS credentials.

### 4. Update contact details (if needed)
Phone, WhatsApp, and email are already set to:
- 📞 +91 96415 91708
- 💬 https://wa.me/919641591708
- 📧 sahilsarki724@gmail.com

Update these in `index.html` if they change (search for the values above).

## 🌐 Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", select **Deploy from a branch**, choose `main` and `/root`.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

## 🎨 Customization Notes

- Colors, fonts, radii, and shadows are defined as CSS custom properties at the top of `style.css` under `:root` — change them there to restyle the whole site.
- Light mode overrides live in `body.light-mode` in the same file.
- All animation logic is vanilla JS in `script.js` — no build step required.

---

Built for **Sahil Sarki** — Full Stack Web Developer & AI Automation Developer.
