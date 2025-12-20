"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { href: "#features", label: t("features") },
    {
      href: "https://apps.apple.com/us/app/sossoldi/id6740497000",
      label: t("download"),
      external: true,
    },
  ];

  const resourceLinks = [
    { href: "/docs", label: t("docs") },
    { href: "/blog", label: t("blog") },
    { href: "/contribute", label: t("contribute") },
  ];

  const communityLinks = [
    {
      href: "https://discord.gg/2A3SkHhw5H",
      label: t("discord"),
      icon: MessageCircle,
      external: true,
    },
    {
      href: "https://github.com/RIP-Comm/Sossoldi",
      label: t("github"),
      icon: Github,
      external: true,
    },
    {
      href: "https://twitter.com/retireinprogres",
      label: t("twitter"),
      icon: Twitter,
      external: true,
    },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  S
                </span>
              </div>
              <span className="text-xl font-bold">Sossoldi</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold">{t("product")}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold">{t("resources")}</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 font-semibold">{t("community")}</h3>
            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("privacy")}
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
