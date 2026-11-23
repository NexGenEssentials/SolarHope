import type { MetadataRoute } from "next";
import { SITE } from "./config/site";

export const dynamic = "force-static";

// Add each new route here as Phase 1/2 pages are built.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/solutions/businesses`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/solutions/homes`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/solutions/repairs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
