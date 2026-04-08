# 🎂 ChefDollsCakeShelf

> **Mumbai's premium home bakery** — Handcrafted 100% eggless custom cakes & desserts, made fresh to order by Dhvani Hariya.

---

## 📖 About

**ChefDollsCakeShelf** is the official website for a homegrown premium bakery based in Mumbai, India. The site showcases custom celebration cakes and desserts — all eggless — and allows customers to browse the menu, build a custom cake order, and get in touch directly via WhatsApp or a contact form.

- 👩‍🍳 **Baker**: Dhvani Hariya
- 📍 **Location**: Mumbai, India
- 🥚 **Specialty**: 100% Eggless custom cakes & desserts

---

## 🛠️ Tech Stack

### Frontend       | Technology                                           |Purpose |
| ----------- | ---------------------------------------------------- |
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server                          |
| Wouter | Client-side routing    |
| Tailwind CSS 4 | Styling |
| Radix UI + Shadcn | Accessible UI primitives |
| tRPC + React Query | Type-safe API data fetching |
| Framer Motion | Animations |
| Lucide React | Icons |
| Zod | Schema validation |
| React Hook Form | Form handling |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express | HTTP server |
| tRPC | Type-safe RPC API layer |
| Google Drive API | Product image storage & gallery |
| Instagram Graph API | Live Instagram feed |
| tsx | TypeScript runner for development |

### 🔤 Typography (Google Fonts)

- **[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)** — Display / headings
- **[Nunito](https://fonts.google.com/specimen/Nunito)** — Body / UI text
- **[Great Vibes](https://fonts.google.com/specimen/Great+Vibes)** — Script / decorative accents

---

## 📁 Project Structure

```
chefdollscakeshelf/
├── client/
│   ├── index.html
│   └── src/
│       ├── main.tsx                # App entry point + tRPC setup
│       ├── App.tsx                 # Router (Wouter)
│       ├── index.css               # Tailwind global styles
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── Footer.tsx
│       │   ├── PageLayout.tsx
│       │   ├── HeroSection.tsx
│       │   ├── AboutSection.tsx
│       │   ├── GallerySection.tsx
│       │   ├── OrderOnline.tsx
│       │   ├── OrderProcess.tsx
│       │   ├── TestimonialsSection.tsx
│       │   ├── WhyChooseUs.tsx
│       │   ├── InstagramSection.tsx
│       │   ├── ContactSection.tsx
│       │   ├── MarqueeBanner.tsx
│       │   ├── FloatingParticles.tsx
│       │   ├── LoadingScreen.tsx
│       │   ├── ErrorBoundary.tsx
│       │   ├── BuildYourCake/      # Multi-step cake customizer
│       │   │   ├── index.tsx
│       │   │   ├── StepProduct.tsx
│       │   │   ├── StepSize.tsx
│       │   │   ├── StepFlavor.tsx
│       │   │   ├── StepFrosting.tsx
│       │   │   ├── StepDecorations.tsx
│       │   │   ├── StepSummary.tsx
│       │   │   ├── OrderSidebar.tsx
│       │   │   ├── MenuOrder.tsx
│       │   │   ├── ProgressBar.tsx
│       │   │   ├── data.ts
│       │   │   └── types.ts
│       │   └── ui/                 # Shadcn primitives
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── About.tsx
│       │   ├── Menu.tsx
│       │   ├── Order.tsx
│       │   ├── Contact.tsx
│       │   └── NotFound.tsx
│       ├── hooks/
│       │   ├── useMobile.tsx
│       │   └── usePersistFn.ts
│       ├── lib/
│       │   ├── trpc.ts
│       │   └── utils.ts
│       └── images/                 # Local image assets
├── server/
│   ├── _core/
│   │   ├── index.ts                # Express app + tRPC + Vite integration
│   │   ├── trpc.ts                 # tRPC initialisation
│   │   ├── context.ts              # tRPC context
│   │   ├── env.ts                  # Environment variable loader
│   │   ├── systemRouter.ts         # Health check
│   │   └── vite.ts                 # Vite dev server bridge
│   ├── routers.ts                  # Root tRPC router
│   ├── googleDriveRouter.ts        # Google Drive gallery + image proxy
│   ├── instagramRouter.ts          # Instagram Graph API feed
│   └── index.ts                    # Production static file server
├── product_details_drive_uploader.py  # Helper: upload product data to Drive
├── .env                            # Environment variables (not committed)
├── credentials.json                # Google service account credentials (not committed)
├── token.json                      # Google OAuth token cache (not committed)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page — hero, about, gallery, testimonials, Instagram feed |
| `/about` | About | Bakery story and baker profile |
| `/menu` | Menu | Product gallery pulled live from Google Drive |
| `/order` | Order | 6-step interactive cake builder → WhatsApp order |
| `/contact` | Contact | Contact form + WhatsApp direct link |
| `*` | NotFound | 404 fallback |

---

## 🔌 API Endpoints

All API routes are served under `/api/trpc` via tRPC:

| Procedure | Description |
|---|---|
| `system.health` | Health check |
| `googleDrive.getGallery` | Fetch product images from Google Drive (5-min cache) |
| `instagram.feed` | Fetch live Instagram posts (30-min cache) or simulated fallback |
| `instagram.refreshToken` | Refresh the long-lived Instagram access token |
| `instagram.clearCache` | Clear the in-memory feed cache |

Image files from Google Drive are streamed through the server via `/api/drive/image/:fileId` so credentials are never exposed to the browser.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=3000

# Google Drive (product gallery)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=your-drive-folder-id

# Instagram (optional — falls back to simulated feed if omitted)
INSTAGRAM_ACCESS_TOKEN=your-long-lived-token
INSTAGRAM_USER_ID=your-instagram-user-id

# Umami Analytics (optional)
VITE_ANALYTICS_ENDPOINT=https://your-umami-instance.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

> ⚠️ Never commit `.env`, `credentials.json`, or `token.json` to version control. All three are listed in `.gitignore`.

---

## 🖼️ Google Drive Gallery Setup

Product images are read directly from a Google Drive folder. The expected folder structure is:

```
Root Folder (GOOGLE_DRIVE_FOLDER_ID)
├── Category Name/
│   ├── Product Name.jpg
│   └── Another Product.png
└── Another Category/
    └── ...
```

Each image file's **description field** in Drive can optionally contain:

```
Short product description | From ₹1,800 | Tag1,Tag2
```

The server parses this to populate description, price, and tags on the gallery cards.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/chefdollscakeshelf.git
cd chefdollscakeshelf

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Google Drive and other credentials

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server (Express + Vite HMR) |
| `npm run build` | Build frontend + bundle server for production |
| `npm run start` | Run production server |
| `npm run check` | TypeScript type check |
| `npm run format` | Format code with Prettier |

### 🏗️ Production Build

```bash
npm run build
npm run start
```

The frontend is built to `dist/public/` and served as static files by the Express server.

---

## 🔍 SEO & Meta

- **Title**: ChefDollsCakeShelf - Handcrafted Eggless Cakes in Mumbai
- **Description**: Mumbai's premium home bakery by Dhvani Hariya. 100% eggless custom cakes, celebration cakes & desserts made fresh to order.
- **Keywords**: eggless cake Mumbai, custom cake Mumbai, birthday cake Mumbai, and 27 more targeted terms
- **Open Graph**: Configured for social sharing previews

---

## 📊 Analytics

The project integrates **[Umami](https://umami.is/)** — a privacy-friendly, open-source web analytics platform — via a deferred script tag in `index.html`.

---

## 📱 Responsive Design

The viewport meta tag is configured for full mobile compatibility:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1"
/>
```

---

## 📬 Contact & Ordering

For cake orders and inquiries, customers can reach **Dhvani Hariya** via WhatsApp or through the contact form on the website.

---

## 📄 License

This project is proprietary. All rights reserved by **Dhvani Hariya / ChefDollsCakeShelf**. Unauthorized use, reproduction, or distribution of this code or content is prohibited.
