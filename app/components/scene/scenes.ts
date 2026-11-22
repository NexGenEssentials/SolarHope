import type { SceneConfig } from "./solarScene";

// Cable traces are in each picture's own pixel coordinates (1672 × 941).

export const CAFE_SCENE: SceneConfig = {
  width: 1672,
  height: 941,
  crop: { y0: 96, hc: 640 },
  battery: { day: 92, night: 41 },
  captions: {
    day: "The sun runs your business and fills the battery at the same time.",
    night: "The grid goes off. The battery takes over by itself, and your lights stay on.",
  },
  day: {
    image: "/images/scene/shop-day.jpg",
    alt: "A café with solar panels on its roof and an inverter and batteries on its outside wall, in daylight",
    runs: [
      { d: "M 520 262 L 360 262 Q 356 262 356 268 L 356 430 L 362 436" },
      { d: "M 392 510 L 392 568 M 406 510 L 406 556 L 476 556 L 476 568" },
      { d: "M 512 688 L 612 688 L 700 688" },
    ],
    cards: [
      { x: 980, y: 110, xNarrow: 700, yNarrow: 20, label: "SOLAR PANELS", value: "Producing", to: [1040, 215] },
      { x: 16, y: 470, yNarrow: 520, w: 230, label: "THE GRID", value: "Connected", to: [178, 400] },
      { x: 560, y: 560, yNarrow: 720, w: 210, label: "BATTERY", value: "%BATTERY%", to: [478, 600] },
      { x: 1290, y: 176, yNarrow: 330, w: 270, label: "YOUR BUSINESS", value: "Running", to: [1300, 470] },
    ],
  },
  night: {
    image: "/images/scene/shop-night.jpg",
    alt: "The same café at night during a power cut, still lit from its battery",
    runs: [
      { d: "M 392 510 L 392 568 M 406 510 L 406 556 L 476 556 L 476 568", reverse: true },
      { d: "M 512 688 L 612 688 L 700 688" },
    ],
    offMarker: [178, 300],
    cards: [
      { x: 980, y: 110, xNarrow: 700, yNarrow: 20, label: "SOLAR PANELS", value: "Resting", to: [1040, 215], tone: "#64748B" },
      { x: 16, y: 470, yNarrow: 520, w: 230, label: "THE GRID", value: "Off", to: [178, 400], tone: "#DC2626" },
      { x: 560, y: 560, yNarrow: 720, w: 210, label: "BATTERY", value: "%BATTERY%", to: [478, 600] },
      { x: 1290, y: 176, yNarrow: 330, w: 270, label: "YOUR BUSINESS", value: "Running", to: [1300, 470] },
    ],
  },
};

export const HOME_SCENE: SceneConfig = {
  width: 1672,
  height: 941,
  crop: { y0: 90, hc: 720 },
  battery: { day: 88, night: 46 },
  captions: {
    day: "The sun runs your home, charges your car and fills the battery.",
    night: "The grid goes off. Your home stays lit and the car keeps charging from the battery.",
  },
  day: {
    image: "/images/scene/home-day.jpg",
    alt: "A family home with solar panels on its roof, an inverter and battery on the side wall and an electric car charging in the driveway, in daylight",
    runs: [
      // panels -> down the roof to the eave -> wall conduit -> inverter
      { d: "M 640 175 L 420 215 L 330 250 L 278 250 L 278 405 L 297 410" },
      // inverter -> battery
      { d: "M 330 397 L 330 440 M 350 397 L 350 440" },
      // inverter -> into the house
      { d: "M 365 435 L 452 435 L 452 300" },
      // house -> along the porch ceiling -> car charger -> car
      { d: "M 452 300 L 1100 300 L 1100 470 M 1102 530 Q 1108 600 1180 595 L 1268 558" },
    ],
    cards: [
      { x: 1380, y: 100, xNarrow: 1000, yNarrow: 10, w: 260, label: "SOLAR PANELS", value: "Producing", to: [1250, 175] },
      { x: 16, y: 120, yNarrow: 10, w: 230, label: "THE GRID", value: "Connected", to: [90, 260] },
      { x: 470, y: 600, yNarrow: 660, w: 210, label: "BATTERY", value: "%BATTERY%", to: [430, 540] },
      { x: 600, y: 120, xNarrow: 520, yNarrow: 330, w: 230, label: "YOUR HOME", value: "Running", to: [700, 420] },
      { x: 1180, y: 320, xNarrow: 1000, yNarrow: 680, w: 230, label: "YOUR CAR", value: "Charging", to: [1100, 500] },
    ],
  },
  night: {
    image: "/images/scene/home-night.jpg",
    alt: "The same home at night during a power cut, lights on and the car still charging from the battery",
    runs: [
      // battery -> inverter (power flowing out of the battery)
      { d: "M 455 450 L 455 485", reverse: true },
      // inverter -> into the house
      { d: "M 485 465 L 570 465 L 570 330" },
      // house -> carport ceiling -> charger -> car
      { d: "M 570 330 L 1110 330 L 1110 519 M 1112 569 Q 1150 600 1195 564" },
    ],
    offMarker: [176, 300],
    cards: [
      { x: 1380, y: 100, xNarrow: 1000, yNarrow: 10, w: 260, label: "SOLAR PANELS", value: "Resting", to: [1250, 240], tone: "#64748B" },
      { x: 16, y: 120, yNarrow: 10, w: 230, label: "THE GRID", value: "Off", to: [176, 260], tone: "#DC2626" },
      { x: 560, y: 640, yNarrow: 700, w: 210, label: "BATTERY", value: "%BATTERY%", to: [540, 560] },
      { x: 640, y: 160, xNarrow: 560, yNarrow: 340, w: 230, label: "YOUR HOME", value: "Running", to: [720, 520] },
      { x: 1180, y: 400, xNarrow: 1000, yNarrow: 760, w: 230, label: "YOUR CAR", value: "Charging", to: [1112, 545] },
    ],
  },
};
