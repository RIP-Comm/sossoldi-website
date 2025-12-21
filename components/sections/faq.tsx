"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div variants={itemVariants} className="group border-t border-border/40">
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-6 py-6 text-left transition-colors md:py-8"
      >
        {/* Number */}
        <span className="shrink-0 font-mono text-xs text-muted-foreground/50 pt-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span className="flex-1 text-base font-medium leading-relaxed text-foreground transition-colors group-hover:text-primary md:text-lg">
          {question}
        </span>

        {/* Toggle icon */}
        <span
          className={cn(
            "mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-border/50 transition-all duration-300",
            isOpen ? "rotate-180 border-primary/50 bg-primary/5" : "group-hover:border-primary/30",
          )}
        >
          <ChevronDown
            className={cn(
              "size-4 transition-colors",
              isOpen ? "text-primary" : "text-muted-foreground group-hover:text-primary",
            )}
          />
        </span>
      </button>

      {/* Answer */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-8 pl-12 pr-12 text-sm leading-relaxed text-muted-foreground md:text-base">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-3xl px-6">
        <SectionHeader
          label="FAQ"
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          description={t("subtitle")}
        />

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.key}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
          {/* Bottom border */}
          <div className="border-t border-border/40" />
        </motion.div>

        {/* Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a
              href="https://discord.gg/2A3SkHhw5H"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Join our Discord
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
