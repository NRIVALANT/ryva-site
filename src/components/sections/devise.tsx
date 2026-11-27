import Image from "next/image";
import { visuels } from "@/content/visuels";

/** Respiration de marque avant la conversion : la devise, sur son visuel. */
export function Devise() {
  const { src, largeur, hauteur, alt } = visuels.devise;
  return (
    <div className="border-t border-bordure bg-fond">
      <Image
        src={src}
        width={largeur}
        height={hauteur}
        alt={alt}
        sizes="(min-width: 66rem) 66rem, 100vw"
        className="revele mx-auto h-auto w-full max-w-5xl mix-blend-lighten"
      />
    </div>
  );
}
