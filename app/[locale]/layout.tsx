import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as { title: string; description: string };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sossoldi.com";
  const siteName = "Sossoldi";
  const title = metadata?.title || "Sossoldi - Master Your Wealth, Transparently";
  const description =
    metadata?.description ||
    "The open-source personal finance app that bridges the gap between manual spreadsheets and automated banking. Track net worth, investments, and expenses in one secure place.";

  // Generate alternate language URLs
  const alternates: Metadata["alternates"] = {
    languages: Object.fromEntries(routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`])),
    canonical: `${baseUrl}/${locale}`,
  };

  return {
    title,
    description,
    keywords: [
      "personal finance",
      "open source",
      "wealth management",
      "net worth tracker",
      "investment tracking",
      "expense tracking",
      "financial transparency",
      "privacy-first finance",
      locale === "it" ? "finanza personale" : undefined,
      locale === "it" ? "gestione patrimonio" : undefined,
    ].filter(Boolean) as string[],
    authors: [{ name: "Sossoldi Team" }],
    creator: "Sossoldi",
    publisher: "Sossoldi",
    alternates,
    openGraph: {
      type: "website",
      locale: locale === "it" ? "it_IT" : "en_US",
      url: `${baseUrl}/${locale}`,
      siteName,
      title,
      description,
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      alternateLocale: routing.locales.filter((loc) => loc !== locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/logo.png`],
      creator: "@sossoldi",
      site: "@sossoldi",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "it")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${nunitoSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
