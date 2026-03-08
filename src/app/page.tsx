import CTASection from "@/components/landing-page/CTASection";
import FeaturesSection from "@/components/landing-page/FeatureSection";
import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import HomeNavbar from "@/components/landing-page/HomeNavbar";
import ShowcaseSections from "@/components/landing-page/ShowcaseSection";

export default function Page() {
  return (
    <div className="bg-background min-h-screen">
      <HomeNavbar />
      <HeroSection />
      <ShowcaseSections />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
