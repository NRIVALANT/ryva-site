import type { MetadataRoute } from "next";
import { pages } from "@/content/seo";
import { urlSite } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map(({ chemin }) => ({ url: new URL(chemin, urlSite()).href }));
}
