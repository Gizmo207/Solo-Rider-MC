# 🏍️ Solo Riders MC

> A cinematic, scroll-driven motorcycle journey.  
> Built for the brotherhood. Forged on the throttle.

## 🌐 Live Site

[Coming Soon] — Awwwards-grade experience powered by Next.js, GSAP, and Spline.

---

## 🚀 Features

- 🎥 Scroll-snapping full-screen sections (Hero → Engine → Exhaust → CTA)
- 🧠 Spline integration (explodable Harley parts, hover FX, scroll-controlled zoom)
- 💨 GSAP ScrollTrigger for buttery cinematic transitions
- 🎮 Framer Motion for animated UI/CTA
- 🧵 TailwindCSS styling with Prettier formatting
- 🔥 Firebase-ready
- 🧼 Printful API integration for real-time merch display

---

## 🏗️ Folder Structure

/src
├── app/ # App router pages & layouts
├── components/ # Reusable components (Hero, CTA, etc.)
│ ├── Hero/
│ ├── FeaturedProducts/
│ └── ui/
├── lib/ # Utilities (firebase, Printful sync)
├── public/ # Static assets (bg.mp4, logo.svg)
├── styles/ # Global CSS, Tailwind

---

## 🛠️ Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/Solo-Riders-MC
cd Solo-Riders-MC

npm install
npm run dev
```

Lint & Format

```bash
npm run lint
npm run format
```

## 🧠 Tech Stack

- Next.js 14 (App Router)
- TailwindCSS + Prettier + ESLint
- Framer Motion + GSAP ScrollTrigger
- Spline 3D embeds
- Firebase / Firestore
- Printful API integration

## 📦 API Keys (.env)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_PRINTFUL_API_KEY=your_printful_key
```

Never expose secrets in the frontend or repo.

## 🧾 License

MIT — you can ride with it, modify it, and build your own journey.

## 🔥 Awwwards-Level Goals

- Smooth scroll-cut scene transitions
- Hover-to-explode Harley parts
- Responsive mobile-first experience
- Sound, smoke, throttle, and chrome

“This isn't a page — it's a ride.”

---

## 🧹 Optional Cleanup Script

If you want a one-liner to nuke local clutter (builds, temp, DS_Store, etc):

```bash
# cleanup.sh
rm -rf .next .DS_Store *.log temp/ node_modules/.cache
```

Add to package.json:

```json
"scripts": {
  "clean": "bash cleanup.sh"
}
```

✅ You’re Now Fully Cleaned and Ready for:

- Adding Spline embeds section-by-section
- Connecting GSAP transitions
- Finishing merch pages with Printful API
- Deploying to Vercel or Cloudflare Pages
