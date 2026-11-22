import HomeTemplates from "./components/templates/homeTemplates";
import HeroSection from "./components/hero/heroSection";
import ImpactSection from "./components/impact/impactSection";
import VisionSection from "./components/vision/visionSection";
import AchievementSection from "./components/achievement/achievementSection";
import QuoteSection from "./components/quote/quoteSection";
import VideoSection from "./components/videos/videoSection";
import SolorJourneySection from "./components/solarJourney/solorJourneySection";
import AutoImageSlider from "./components/gallery/gallerySection";
import MarqueeSlider from "./components/gallery/gallerySection2";

export default function Home() {
  return (
    <HomeTemplates>
      <HeroSection />
      <AutoImageSlider />
      <MarqueeSlider />
      <ImpactSection id="impact" />
      <VisionSection id="about" />
      <SolorJourneySection id="services" />
      <VideoSection id="videos" />
      {/* Hidden until SHOW_ACHIEVEMENTS is on — see app/config/site.ts */}
      <AchievementSection />
      <QuoteSection id="quote" />
    </HomeTemplates>
  );
}
