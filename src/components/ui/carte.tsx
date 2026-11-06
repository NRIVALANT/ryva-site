import type { ReactNode } from "react";

interface CarteProps {
  children: ReactNode;
  className?: string;
}

/** Carte : prend le fond opposé à celui de sa section (voir Section), pour rester distincte. */
export function Carte({ children, className = "" }: CarteProps) {
  return (
    <div
      className={`rounded-lg border border-bordure bg-surface p-6 group-data-[fond=surface]/section:bg-fond ${className}`}
    >
      {children}
    </div>
  );
}
