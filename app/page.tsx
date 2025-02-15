import Hero from "@/components/hero";
import FaqSection from "@/components/faq-section";
import BlogSection from "@/components/blog-section";
import AboutSection from "@/components/about-section";
import AnalyticSection from "@/components/analytic-section";
import FinancialSection from "@/components/financial-section";

export default function Home() {
  return (
    <>
      <Hero />
      <AnalyticSection />
      <AboutSection />
      <FinancialSection />
      <FaqSection />
      <BlogSection />
    </>
  );
}
