import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { FAQ } from "@/components/sections/faq";
import { BlogPreview } from "@/components/sections/blog-preview";
import { DiscordCTA } from "@/components/sections/discord-cta";
import { SectionDivider } from "@/components/ui/section-divider";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <BlogPreview />
        <DiscordCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
