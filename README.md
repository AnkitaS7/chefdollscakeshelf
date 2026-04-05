# 🎂 ChefDollsCakeShelf

> **Mumbai's premium home bakery** - Handcrafted 100% eggless custom cakes & desserts, made fresh to order by Dhvani Hariya.

---

## 📖 About

**ChefDollsCakeShelf** is the official website for a homegrown premium bakery based in Mumbai, India. The site showcases custom celebration cakes and desserts - all eggless - and allows customers to place orders for birthdays, weddings, and other special occasions.

- 👩‍🍳 **Baker**: Dhvani Hariya
- 📍 **Location**: Mumbai, India
- 🥚 **Specialty**: 100% Eggless custom cakes & desserts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React](https://react.dev/) with TypeScript (`.tsx`) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Analytics | [Umami](https://umami.is/) (self-hosted or cloud) |
| Fonts | Google Fonts (see below) |
| Entry Point | `src/main.tsx` |

### 🔤 Typography

Three Google Fonts families are used for a refined, elegant aesthetic:

- **[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)** - Weights 300–700, including italics (display / headings)
- **[Nunito](https://fonts.google.com/specimen/Nunito)** - Weights 300–700 (body / UI text)
- **[Great Vibes](https://fonts.google.com/specimen/Great+Vibes)** - Script font (decorative / branding accents)

---

## ⚙️ Environment Variables

The project uses Vite environment variables. Create a `.env` file in the project root with the following keys:

```env
# Umami Analytics
VITE_ANALYTICS_ENDPOINT=https://your-umami-instance.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id-here
```

> ⚠️ Never commit `.env` files containing real credentials to version control. Add `.env` to your `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/chefdollscakeshelf.git
cd chefdollscakeshelf

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Umami analytics credentials

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
chefdollscakeshelf/
├── public/              # Static assets (favicon, images, etc.)
├── src/
│   ├── main.tsx         # Application entry point
│   └── ...              # Components, pages, styles
├── index.html           # HTML template (Vite entry)
├── .env                 # Environment variables (not committed)
├── .env.example         # Example environment file
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies & scripts
```

---

## 🔍 SEO & Meta

The site is optimized for search engines with the following metadata:

- **Title**: ChefDollsCakeShelf - Handcrafted Eggless Cakes in Mumbai
- **Description**: Mumbai's premium home bakery by Dhvani Hariya. 100% eggless custom cakes, celebration cakes & desserts made fresh to order.
- **Keywords**: eggless cake Mumbai, custom cake Mumbai, birthday cake Mumbai, home bakery Mumbai
- **Open Graph**: Configured for social sharing previews

---

## 📊 Analytics

The project integrates **[Umami](https://umami.is/)** - a privacy-friendly, open-source web analytics platform - via a deferred script tag. Analytics data is tied to the `VITE_ANALYTICS_WEBSITE_ID` configured in your environment.

---

## 📱 Responsive Design

The viewport meta tag is configured for full mobile compatibility:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
```

---

## 📬 Contact & Ordering

For cake orders and inquiries, please reach out to **Dhvani Hariya** directly through the website's contact/order section.

---

## 📄 License

This project is proprietary. All rights reserved by **Dhvani Hariya / ChefDollsCakeShelf**. Unauthorized use, reproduction, or distribution of this code or content is prohibited.
