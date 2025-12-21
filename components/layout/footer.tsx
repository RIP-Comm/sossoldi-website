"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Github, MessageCircle } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { href: "#features", label: t("features") },
    { href: "#", label: t("download") },
    { href: "#", label: t("pricing") },
  ];

  const resourceLinks = [
    { href: "#", label: t("docs") },
    { href: "/blog", label: t("blog"), isInternal: true },
    { href: "#", label: t("contribute") },
  ];

  const communityLinks = [
    { href: "https://discord.gg/2A3SkHhw5H", label: t("discord"), external: true },
    { href: "https://github.com/RIP-Comm/Sossoldi", label: t("github"), external: true },
  ];

  const legalLinks = [
    { href: "#", label: t("privacy") },
    { href: "#", label: t("terms") },
  ];

  const socialLinks = [
    {
      href: "https://discord.gg/2A3SkHhw5H",
      icon: MessageCircle,
      label: "Discord",
    },
    {
      href: "https://github.com/RIP-Comm/Sossoldi",
      icon: Github,
      label: "GitHub",
    },
  ];

  return (
    <footer className="relative bg-background text-foreground overflow-hidden">
      {/* Upper section with links */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Sossoldi"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold text-lg">Sossoldi</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t("tagline")}
            </p>
          </motion.div>

          {/* Product column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold text-sm tracking-wide mb-4 text-foreground">
              {t("product")}
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-semibold text-sm tracking-wide mb-4 text-foreground">
              {t("resources")}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) =>
                link.isInternal ? (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Community column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-sm tracking-wide mb-4 text-foreground">
              {t("community")}
            </h3>
            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="font-semibold text-sm tracking-wide mb-4 text-foreground">
              {t("legal")}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 border-t border-border"
        />

        {/* Bottom section with social links and copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={social.label}
              >
                {typeof social.icon === "function" && (
                  <social.icon />
                )}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            {t("copyright", { year: currentYear })}
          </p>
        </motion.div>
      </div>

      {/* Giant SOSSOLDI text at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex justify-center items-end pb-4">
          <span
            className="font-bold select-none leading-none tracking-tighter giant-text"
            style={{
              fontSize: "clamp(4rem, 18vw, 16rem)",
              color: "transparent",
              WebkitTextStroke: "1px var(--muted)",
            }}
          >
            SOSSOLDI
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
