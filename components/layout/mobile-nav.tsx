"use client";

import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Download } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { href: string; label: string }[];
}

export function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  const t = useTranslations("nav");

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">S</span>
            </div>
            Sossoldi
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}

          <Separator className="my-2" />

          <a
            href="https://github.com/RIP-Comm/Sossoldi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary"
          >
            <Github className="size-5" />
            {t("github")}
          </a>

          <Separator className="my-2" />

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <a
                href="https://apps.apple.com/us/app/sossoldi/id6740497000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 size-4" />
                App Store
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a
                href="https://play.google.com/store/apps/details?id=com.ripcomm.sossoldi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 size-4" />
                Play Store
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
