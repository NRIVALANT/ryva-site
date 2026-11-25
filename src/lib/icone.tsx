import { ImageResponse } from "next/og";
import { imageMarque, jeton } from "./images-marque";
import { logos } from "./marque";

/**
 * Icône carrée dérivée de ryva-icone.png. Le fichier a des coins blancs (RGB sans alpha) : ils sont
 * masqués par un arrondi, sans toucher au dessin. `opaque` remplit le carré (écran d'accueil iOS).
 */
export async function icone(cote: number, opaque: boolean) {
  const { src, largeur, hauteur } = logos.icone;
  const largeurImage = opaque ? Math.round(cote * 0.9) : cote;
  const source = await imageMarque(src);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: opaque ? jeton("marque-noir") : "transparent",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendu par next/og, pas dans la page */}
        <img
          src={source}
          alt=""
          width={largeurImage}
          height={Math.round((largeurImage * hauteur) / largeur)}
          style={{ borderRadius: Math.round(largeurImage * 0.2) }}
        />
      </div>
    ),
    { width: cote, height: cote },
  );
}
