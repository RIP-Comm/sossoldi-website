"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/section-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const t = useTranslations("faq");

  const faqItems = [
    {
      key: "security",
      question: t("security.question"),
      answer: t("security.answer"),
    },
    {
      key: "pricing",
      question: t("pricing.question"),
      answer: t("pricing.answer"),
    },
    {
      key: "contribution",
      question: t("contribution.question"),
      answer: t("contribution.answer"),
    },
    {
      key: "openSource",
      question: t("openSource.question"),
      answer: t("openSource.answer"),
    },
  ];

  return (
    <SectionContainer id="faq" className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-sossoldi-accent/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("title")}{" "}
            <span className="gradient-text dark:gradient-text-dark">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={item.key}
                  className="glass mb-4 rounded-xl border-none px-6"
                >
                  <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional help link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="https://discord.gg/2A3SkHhw5H"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Join our Discord community
            </a>
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
