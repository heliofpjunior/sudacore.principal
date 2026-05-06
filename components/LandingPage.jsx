import AudienceSection from "@/components/landing/AudienceSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ContactSection from "@/components/landing/ContactSection";
import DiagnosticSection from "@/components/landing/DiagnosticSection";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import InsightsSection from "@/components/landing/InsightsSection";
import MethodSection from "@/components/landing/MethodSection";
import SolutionsSection from "@/components/landing/SolutionsSection";

export default function LandingPage({ posts }) {
  return (
    <>
      <Header />
      <main>
        <InsightsSection posts={posts} />
        <HeroSection />
        <SolutionsSection />
        <AudienceSection />
        <MethodSection />
        <DiagnosticSection />
        <BenefitsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
