# Sossoldi Landing Page

The official landing page for [Sossoldi](https://github.com/RIP-Comm/Sossoldi) - the open-source personal finance app by the Mr. RIP Community.

## Features

- **Internationalization**: Full English and Italian support with URL prefix routing (`/en`, `/it`)
- **Modern Design**: Glassmorphism UI with the "Serious Blue" Sossoldi brand palette
- **Animations**: Smooth Framer Motion animations including animated counters and graphs
- **Dark/Light Mode**: System-aware theme switching
- **MDX Blog**: Static blog with full MDX support
- **SEO Optimized**: Static generation for all pages

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom Sossoldi color palette
- **Components**: shadcn/ui (New York style)
- **Animations**: Framer Motion
- **i18n**: next-intl with prefix routing
- **Content**: MDX for blog posts

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

## Project Structure

```
app/
├── [locale]/
│   ├── layout.tsx          # Locale-wrapped layout
│   ├── page.tsx            # Landing page
│   └── blog/
│       ├── page.tsx        # Blog listing
│       └── [slug]/         # Individual blog posts
├── globals.css             # Sossoldi brand colors & styles

components/
├── layout/                 # Navbar, Footer, MobileNav, LocaleSwitcher
├── sections/               # Hero, Features, FAQ, BlogPreview
├── ui/                     # shadcn/ui + custom components
└── providers/              # Theme provider

content/
└── blog/                   # MDX blog posts

i18n/
├── routing.ts              # Locale configuration
├── request.ts              # next-intl server config
└── navigation.ts           # Localized navigation helpers

messages/
├── en.json                 # English translations
└── it.json                 # Italian translations
```

## Redirects

The middleware handles external redirects:

| Path | Destination |
|------|-------------|
| `/docs` | GitHub Pages documentation |
| `/contribute` | CONTRIBUTING.md on GitHub |
| `/community` | Discord invite |
| `/repo` | GitHub repository |

## Brand Colors

The Sossoldi "Serious Blue" palette:

- **Primary**: `#0D47A1` (Blue 900)
- **Primary Light**: `#1565C0` (Blue 800)
- **Accent**: `#42A5F5` (Blue 400)
- **Success**: `#4CAF50` (Income/Positive)
- **Destructive**: `#EF5350` (Expense/Negative)

## Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
export const metadata = {
  title: "Your Post Title",
  publishDate: "2024-12-20",
  excerpt: "A brief description of the post.",
  author: {
    name: "Author Name",
    bio: "Short bio",
    avatar: "https://github.com/username.png",
  },
  tags: ["Tag1", "Tag2"],
  seo: {
    metaTitle: "SEO Title",
    metaDescription: "SEO Description",
  },
};

Your MDX content here...
```

## License

Open source, built with ❤️ by the Mr. RIP Community.
