import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CaseStudySection from "@/components/CaseStudySection";
import ServicesSection from "@/components/ServicesSection";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onContactClick={() => setIsContactModalOpen(true)} />
      <HeroSection onContactClick={() => setIsContactModalOpen(true)} />
      <ProblemSection />
      <SolutionSection />
      <CaseStudySection />
      <ServicesSection />
      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default Index;
