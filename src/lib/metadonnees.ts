import type { Metadata } from "next";
import { partage, type PageSeo } from "@/content/seo";
import { site } from "@/content/site";

/** Métadonnées d'une page : titre, description, URL canonique et partage. */
export function metadonnees({ chemin, titre, description }: PageSeo): Metadata {
  // Un `openGraph` défini par une page remplace celui du parent, image comprise : on la redéclare.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: partage.alt }];
  return {
    title: titre,
    description,
    alternates: { canonical: chemin },
    openGraph: {
      type: "website",
      locale: partage.locale,
      siteName: site.nom,
      url: chemin,
      title: titre,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: titre, description, images },
  };
}
