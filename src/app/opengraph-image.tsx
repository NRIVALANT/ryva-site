import { ImageResponse } from "next/og";
import { partage } from "@/content/seo";
import { imageMarque, jeton } from "@/lib/images-marque";
import { logos } from "@/lib/marque";

export const alt = partage.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ImagePartage() {
  const logo = logos.logotypeBlanc;
  const largeur = 760;
  const source = await imageMarque(logo.src);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          background: jeton("fond"),
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendu par next/og, pas dans la page */}
        <img src={source} alt="" width={largeur} height={Math.round((largeur * logo.hauteur) / logo.largeur)} />
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: jeton("cedre-texte") }}>
          {partage.devise}
        </div>
      </div>
    ),
    size,
  );
}
