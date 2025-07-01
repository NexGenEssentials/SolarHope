import Image from "next/image";
import HomeTemplates from "./components/templates/homeTemplates";
import HeroSection from "./components/hero/heroSection";
import ImpactSection from "./components/impact/impactSection";
import VisionSection from "./components/vision/visionSection";
import AchievementSection from "./components/achievement/achievementSection";
import TestimonialSection from "./components/testmonial/testimonial";
import JoinSection from "./components/join/joinSection";
import SolorJourneySection from "./components/solarJourney/solorJourneySection";
import AutoImageSlider from "./components/gallery/gallerySection";
import MarqueeSlider from "./components/gallery/gallerySection2";

export default function Home() {
  return (
    <HomeTemplates>
      <HeroSection />
      <AutoImageSlider />
      <MarqueeSlider/>
      <ImpactSection />
      <VisionSection />
      <SolorJourneySection />
      <AchievementSection />
      <TestimonialSection />
      <JoinSection />
    </HomeTemplates>
  );
}
