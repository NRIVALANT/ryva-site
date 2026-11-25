import { icone } from "@/lib/icone";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icone() {
  return icone(size.width, false);
}
