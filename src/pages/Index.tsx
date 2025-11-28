import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturedDeals from "@/components/FeaturedDeals";
import ImpactSection from "@/components/ImpactSection";
import StoreCategories from "@/components/StoreCategories";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturedDeals />
      <ImpactSection />
      <StoreCategories />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
