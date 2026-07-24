import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ForwardIcon } from "../components/arrow-icon";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Venue — Bourbon Bowl",
  description: "The Bourbon Bowl is played at Union League National Golf Club in Swainton, New Jersey.",
};

export default function VenuePage() {
  return (
    <main>
      <SiteHeader />

      <section className="section-shell">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Official venue</p>
            <h2>Where the<br /><em>Bowl is played.</em></h2>
          </div>
          <p>
            Union League National Golf Club — home course for every Bourbon Bowl since 2024.
            Three nines. One outing.
          </p>
        </div>
        <p className="section-cta">
          <Link href="/2026">Year Three tee times <ForwardIcon /></Link>
        </p>
      </section>

      <section className="venue" aria-labelledby="venue-title">
        <div className="venue-brand">
          <p className="eyebrow">Official venue / Swainton, New Jersey</p>
          <Image
            src="/UNL_bb_wordmark.svg"
            alt="Union League National"
            width={801}
            height={301}
            sizes="(max-width: 1050px) 86vw, 43vw"
            priority
          />
          <p className="venue-address">1765 Route 9 North · Swainton, NJ 08210</p>
        </div>
        <div className="venue-content">
          <p className="eyebrow">The home course</p>
          <h2 id="venue-title">Grant. Meade.<br /><em>Sherman.</em></h2>
          <p className="venue-lead">
            The Bourbon Bowl is played at Union League National Golf Club, a 27-hole course built around three distinct nines: Grant, Meade, and Sherman.
          </p>
          <div className="venue-facts" aria-label="Venue facts">
            <div><strong>27</strong><span>Holes</span></div>
            <div><strong>03</strong><span>Nines</span></div>
            <div><strong>NJ</strong><span>Swainton</span></div>
          </div>
          <a className="venue-link" href="https://www.unionleague.org/golf/national" target="_blank" rel="noreferrer">
            Explore Union League National <ArrowIcon />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
