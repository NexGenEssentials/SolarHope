import HomeTemplates from "./components/templates/homeTemplates";
import HeroSection from "./components/hero/heroSection";
import ImpactSection from "./components/impact/impactSection";
import VisionSection from "./components/vision/visionSection";
import AchievementSection from "./components/achievement/achievementSection";
import QuoteSection from "./components/quote/quoteSection";
import VideoSection from "./components/videos/videoSection";
import SolorJourneySection from "./components/solarJourney/solorJourneySection";
import MarqueeSlider from "./components/gallery/gallerySection2";
import BrandMarquee from "./components/brands/brandMarquee";

export default function Home() {
  return (
    <HomeTemplates>
      <HeroSection />
      <MarqueeSlider />
      <ImpactSection id="impact" />
      <VisionSection id="about" />
      <SolorJourneySection id="services" />
      <VideoSection id="videos" />
      {/* Equipment we trust */}
      <section className="bg-white">
        <div className="max-w-[1570px] mx-auto px-6 sm:px-20 pb-16 space-y-6">
          <p className="text-amber-500 text-lg uppercase">Equipment we trust</p>
          <BrandMarquee />
        </div>
      </section>
      {/* Hidden until SHOW_ACHIEVEMENTS is on — see app/config/site.ts */}
      <AchievementSection />
      <QuoteSection id="quote" />
    </HomeTemplates>
  );
}
