import { PageLegale } from "@/components/legal/page-legale";
import { pagesLegales } from "@/content/legal";
import { pages } from "@/content/seo";
import { metadonnees } from "@/lib/metadonnees";

export const metadata = metadonnees(pages.mentionsLegales);

export default function PageMentionsLegales() {
  return <PageLegale {...pagesLegales.mentionsLegales} />;
}
