import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { YearEdition } from "../components/year-edition";
import { YearNav } from "../components/year-nav";
import { editions } from "../../lib/editions";

export const metadata: Metadata = {
  title: "History — Bourbon Bowl",
  description: "Every Bourbon Bowl pairing, team, and champion from 2024 onward.",
};

export default function HistoryPage() {
  return (
    <main>
      <SiteHeader />

      <section className="history section-shell">
        <div className="section-header">
          <div>
            <p className="eyebrow">The archive</p>
            <h2>Every pairing.<br /><em>Every year.</em></h2>
          </div>
          <p>
            Two completed editions. Champions first, then the field, then every scheduled match —
            ready for scorecards when they surface.{" "}
            <Link href="/2026">Year Three is underway →</Link>
          </p>
        </div>

        <YearNav />

        {editions.map((edition) => (
          <YearEdition edition={edition} key={edition.year} showAnchor={false} />
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
