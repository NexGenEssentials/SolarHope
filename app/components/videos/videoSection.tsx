import React from "react";

// Tap-to-play reels. preload="none" means nothing downloads until a visitor
// presses play, so these add no weight to the page load.
const videos = [
  {
    src: "/videos/installation-day.mp4",
    poster: "/videos/installation-day-poster.jpg",
    title: "Installation day",
    desc: "Our team installing an inverter and battery, with the panels already up on the roof.",
  },
  {
    src: "/videos/team-at-work.mp4",
    poster: "/videos/team-at-work-poster.jpg",
    title: "Our team at work",
    desc: "Wiring the inverter, connecting the battery and testing before switch-on.",
  },
];

const VideoSection = ({ id }: { id?: string }) => {
  return (
    <section id={id}>
      <div className="bg-white text-dark-blue">
        <div className="max-w-[1570px] mx-auto p-8 sm:p-20">
          <div className="flex flex-col items-center gap-12">
            <h2 className="font-bold text-3xl sm:text-5xl text-center">
              See Our Work
            </h2>
            <div className="flex flex-wrap justify-center gap-12">
              {videos.map((v) => (
                <figure
                  key={v.src}
                  className="flex flex-col items-center gap-4 w-[280px]"
                >
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    playsInline
                    preload="none"
                    aria-label={v.title}
                    className="w-[280px] aspect-[9/16] object-cover rounded-xl shadow-lg border-4 border-yellow bg-dark-blue"
                  />
                  <figcaption className="text-center space-y-1">
                    <h3 className="text-lg font-semibold">{v.title}</h3>
                    <p className="text-sm text-gray-600">{v.desc}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
