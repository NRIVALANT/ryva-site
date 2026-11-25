import type { MetadataRoute } from "next";
import { estIndexable } from "@/lib/indexation";
import { urlSite } from "@/lib/url";

export default function robots(): MetadataRoute.Robots {
  if (!estIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${urlSite()}/sitemap.xml` };
}
