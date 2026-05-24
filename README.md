# Mahen's Raz — Portfolio v2

Bilingual (EN/FR) developer portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Bilingual** — Full English / French toggle, persists across the session
- **Next.js 15** App Router + Server/Client Components
- **TypeScript** — strictly typed
- **Tailwind CSS** — custom dark design tokens
- **Framer Motion** — page loader, scroll-reveal, stagger, spring animations
- **Project image gallery** — navigable screenshot carousel per project
- **GitHub links** — per-project repo link in card + modal
- **Node.js / Express.js** — added to primary tech stack
- **Responsive** — mobile-first, all screen sizes

## 🗂 Structure

```
portfolio/
├── app/
│   ├── globals.css           # Design tokens, noise, keyframes
│   ├── layout.tsx            # Root layout + SEO + LanguageProvider
│   └── page.tsx              # Main page (server component)
├── components/
│   ├── animations/
│   │   └── ScrollReveal.tsx  # Scroll-triggered wrappers (+ StaggerContainer)
│   ├── layout/
│   │   ├── Navbar.tsx        # Sticky nav + language switcher (EN/FR)
│   │   └── Footer.tsx        # Footer
│   ├── sections/
│   │   ├── Hero.tsx          # Animated hero, bilingual tagline
│   │   ├── About.tsx         # Paragraphs + stats (bilingual)
│   │   ├── TechStack.tsx     # Skill pills + domain bars (bilingual)
│   │   ├── Projects.tsx      # Cards + modal with image gallery + GitHub
│   │   ├── Experience.tsx    # Timeline (bilingual roles/descriptions)
│   │   └── Contact.tsx       # Form + contact links (bilingual)
│   ├── providers/
│   │   └── Providers.tsx     # Client wrapper for LanguageProvider
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── PageLoader.tsx
├── context/
│   └── LanguageContext.tsx   # Lang context + useLang() hook
├── lib/
│   ├── data.ts               # All content: bilingual projects, experience, profile
│   ├── translations.ts       # All UI strings in EN + FR
│   └── utils.ts              # cn() utility
├── types/
│   └── index.ts              # TypeScript interfaces
└── public/
    └── screenshots/          # ← PUT YOUR PROJECT SCREENSHOTS HERE
        └── README.md
```

## 🚀 Quick Start

```bash
# Unzip and enter the project
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📩 Contact Form Delivery (Gmail + Telegram)

The contact form now sends:

- an email to your Gmail inbox
- a Telegram notification to your chat

No database is required.

1. Copy `.env.example` to `.env.local`
2. Fill the values:

```bash
CONTACT_TO_EMAIL=yourgmail@gmail.com
GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
TELEGRAM_BOT_TOKEN=123456789:your_bot_token
TELEGRAM_CHAT_ID=123456789
```

### Gmail setup

- Enable 2-Step Verification on your Google account.
- Create an App Password (Google Account → Security → App passwords).
- Use that value for `GMAIL_APP_PASSWORD`.

### Telegram setup

- Create a bot with `@BotFather` and get `TELEGRAM_BOT_TOKEN`.
- Send at least one message to your bot from your Telegram account.
- Get your chat id by opening:
  `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
- Use the numeric id for `TELEGRAM_CHAT_ID`.

## 📸 Adding Project Screenshots

1. Place your images inside `public/screenshots/`
2. Name them exactly as listed in `lib/data.ts` > project `images[]`

| Project            | Expected filenames                                  |
| ------------------ | --------------------------------------------------- |
| NetPass            | `netpass-1.png` · `netpass-2.png` · `netpass-3.png` |
| Complaint System   | `complaint-1.png` · `complaint-2.png`               |
| Scholarship System | `scholarship-1.png` · `scholarship-2.png`           |
| Green Hope         | `green-hope-1.png` · `green-hope-2.png`             |

You can add as many images as you like per project — the carousel handles any number.  
If an image is missing or fails to load, the modal shows a fallback gracefully.

## 🔗 Setting Up GitHub Links

Edit `lib/data.ts` and replace the placeholder GitHub URLs:

```ts
github: "https://github.com/YOUR_USERNAME/YOUR_REPO",
```

Each project card shows a GitHub icon button. The modal shows a full "GitHub Repo" button with external link.

## 🌐 Bilingual System

The language switcher is in the Navbar (top right). Clicking toggles between **EN** and **FR**.

**To edit UI strings** — edit `lib/translations.ts`  
**To edit project content** — edit `lib/data.ts` (each field has `{ en: "...", fr: "..." }`)

## ⚙️ Customization

| File                  | What to edit                                                       |
| --------------------- | ------------------------------------------------------------------ |
| `lib/data.ts`         | Your name, projects, experience, tech stack, GitHub/LinkedIn links |
| `lib/translations.ts` | All UI label text in EN and FR                                     |
| `app/globals.css`     | Colors, fonts, animations                                          |
| `tailwind.config.ts`  | Design tokens (colors, shadows, etc.)                              |
| `public/screenshots/` | Your project screenshots                                           |

## 🌐 Deploy to Vercel

```bash
# Via CLI
npm i -g vercel && vercel

# Or push to GitHub → import on vercel.com → Deploy
```

Vercel auto-detects Next.js. No environment variables needed.

## 🧩 Tech Stack

| Tool          | Version | Purpose                           |
| ------------- | ------- | --------------------------------- |
| Next.js       | 15      | Framework (App Router)            |
| TypeScript    | 5       | Type safety                       |
| Tailwind CSS  | 3.4     | Styling                           |
| Framer Motion | 11      | Animations                        |
| Lucide React  | 0.468   | Icons                             |
| Google Fonts  | —       | Outfit + DM Sans + JetBrains Mono |

---

Built by **Mahen's Raz** — Full Stack Developer & Software Engineering Student
