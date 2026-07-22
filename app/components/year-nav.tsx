import Link from "next/link";
import { editions } from "../../lib/editions";

const years = [
  { year: 2024, label: "Archive / 01", detail: editions[0]?.champion ?? "Flex Beans" },
  { year: 2025, label: "Archive / 02", detail: editions[1]?.champion ?? "Big Daddy’s" },
  { year: 2026, label: "Current / 03", detail: "The Third Playing" },
] as const;

export function YearNav({ current }: { current?: number }) {
  return (
    <nav className="history-jump" aria-label="Bourbon Bowl years">
      {years.map((entry) => (
        <Link
          href={`/${entry.year}`}
          key={entry.year}
          aria-current={current === entry.year ? "page" : undefined}
        >
          <small>{entry.label}</small>
          <b>{entry.year}</b>
          <span>{entry.detail}</span>
        </Link>
      ))}
    </nav>
  );
}
