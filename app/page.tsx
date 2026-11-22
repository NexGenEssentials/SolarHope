import HomeTemplates from "./components/templates/homeTemplates";
import HeroSection from "./components/hero/heroSection";
import DoorsSection from "./components/doors/doorsSection";
import ImpactSection from "./components/impact/impactSection";
import AchievementSection from "./components/achievement/achievementSection";
import QuoteSection from "./components/quote/quoteSection";
import VideoSection from "./components/videos/videoSection";
import SolorJourneySection from "./components/solarJourney/solorJourneySection";
import AutoImageSlider from "./components/gallery/gallerySection";
import SetupOptions from "./components/setups/setupOptions";
import BrandMarquee from "./components/brands/brandMarquee";

const label = "text-amber-500 text-lg uppercase";
const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function Home() {
  return (
    <HomeTemplates>
      <HeroSection />
      <DoorsSection />
      <ImpactSection id="about" />
      <SetupOptions who="home or business" labelClass={label} container={container} variant="blue" />
      <SolorJourneySection id="services" />
      <AutoImageSlider />
      <VideoSection id="work" />
      {/* Equipment we trust */}
      <section className="bg-white">
        <div className={`${container} pb-16 space-y-6`}>
          <p className={label}>Equipment we trust</p>
          <BrandMarquee />
        </div>
      </section>
      {/* Hidden until SHOW_ACHIEVEMENTS is on — see app/config/site.ts */}
      <AchievementSection />
      <QuoteSection id="quote" />
    </HomeTemplates>
  );
}
