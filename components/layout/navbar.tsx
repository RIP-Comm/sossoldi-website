"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { Github, Menu, X, Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

export function Navbar() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#features", label: t("features") },
    { href: "#blog", label: t("blog") },
    { href: "#faq", label: t("faq") },
    { href: "https://docs.sossoldi.com", label: t("docs"), isExternal: true },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500",
          isScrolled ? "py-3" : "py-6",
        )}
      >
        {/* Unified rounded-full container */}
        <nav
          className={cn(
            "flex h-12 items-center gap-1 rounded-full px-1.5 transition-all duration-500",
            isScrolled
              ? "border border-border/50 bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "border border-border/30 bg-background/60 backdrop-blur-md",
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo-bg.png"
              alt="Sossoldi Logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="text-sm font-bold pr-0.5">Sossoldi</span>
          </Link>

          {/* Separator */}
          <div className="hidden h-5 w-px bg-border/50 md:block" />

          {/* Desktop Navigation */}
          <div className="hidden items-center md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all hover:bg-muted/80 hover:text-foreground"
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
              >
                {item.label}
                {item.isExternal && <ExternalLink className="size-3" />}
              </a>
            ))}
          </div>

          {/* Separator */}
          <div className="hidden h-5 w-px bg-border/50 md:block" />

          {/* Right side actions */}
          <div className="flex items-center gap-0.5">
            <div className="hidden items-center sm:flex">
              <ThemeToggle />
              <LocaleSwitcher />
            </div>

            {/* Separator before GitHub */}
            <div className="hidden h-5 w-px bg-border/50 mx-0.5 md:block" />

            {/* GitHub CTA - emphasized */}
            <Button variant="default" asChild>
              <a
                href="https://github.com/RIP-Comm/Sossoldi"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 md:flex"
              >
                <Github className="size-3.5" />
                <span>{t("github")}</span>
                <Star className="size-3 fill-current" />
              </a>
            </Button>

            {/* Mobile menu button */}
            <button
              className="flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed left-4 right-4 top-4 z-50 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image
                    src="/logo-bg.png"
                    alt="Sossoldi Logo"
                    width={36}
                    height={36}
                    className="rounded-lg"
                  />
                  <span className="text-lg font-bold">Sossoldi</span>
                </Link>
                <button
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 rounded-2xl px-4 py-3 text-lg font-medium transition-colors hover:bg-muted"
                    onClick={() => setIsMobileMenuOpen(false)}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                    {item.isExternal && <ExternalLink className="size-4" />}
                  </motion.a>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LocaleSwitcher />
                </div>
                {/* GitHub CTA - emphasized */}
                <Button variant="default" asChild>
                  <a
                    href="https://github.com/RIP-Comm/Sossoldi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-all hover:bg-foreground/90"
                  >
                    <Github className="size-5" />
                    <span>{t("github")}</span>
                    <Star className="size-4 fill-current" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
