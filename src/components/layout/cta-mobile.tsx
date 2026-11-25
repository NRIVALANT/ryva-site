import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { LienBouton } from "@/components/ui/lien-bouton";

/** Barre fixe en bas d'écran, mobile uniquement (CADRAGE §3). Fond opaque : aucun risque de contraste. */
export function CtaMobile() {
  return (
    <div
      role="region"
      data-cta-mobile
      aria-label={ui.mobile.ariaCta}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-bordure bg-fond p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden"
    >
      <LienBouton href={site.ctaDemo.href} className="w-full">
        {site.ctaDemo.libelle}
      </LienBouton>
    </div>
  );
}
