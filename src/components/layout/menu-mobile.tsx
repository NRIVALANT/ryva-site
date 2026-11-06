"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { LienNavigation } from "@/content/site";

interface MenuMobileProps {
  liens: LienNavigation[];
  libelle: string;
  ariaOuvrir: string;
  ariaFermer: string;
  ariaNavigation: string;
}

/** Menu des ancres sous 1024 px. Seul morceau de JavaScript client du header. */
export function MenuMobile({
  liens,
  libelle,
  ariaOuvrir,
  ariaFermer,
  ariaNavigation,
}: MenuMobileProps) {
  const [ouvert, setOuvert] = useState(false);
  const idPanneau = useId();
  const bouton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOuvert(false);
        bouton.current?.focus();
      }
    };
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [ouvert]);

  return (
    <div className="lg:hidden">
      <button
        ref={bouton}
        type="button"
        aria-expanded={ouvert}
        aria-controls={idPanneau}
        aria-label={ouvert ? ariaFermer : ariaOuvrir}
        onClick={() => setOuvert((o) => !o)}
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 texte-corps-vitrine font-medium text-texte hover:bg-surface"
      >
        {ouvert ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
        {libelle}
      </button>
      <nav
        id={idPanneau}
        aria-label={ariaNavigation}
        hidden={!ouvert}
        className="absolute inset-x-0 top-full border-b border-bordure bg-fond"
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
          {liens.map((lien) => (
            <li key={lien.href}>
              <a
                href={lien.href}
                onClick={() => setOuvert(false)}
                className="flex min-h-11 items-center texte-corps-vitrine text-texte hover:text-action"
              >
                {lien.libelle}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
