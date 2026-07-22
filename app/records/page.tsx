import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { allPlayers } from "../../lib/players";

export const metadata: Metadata = {
  title: "Records — Bourbon Bowl",
  description: "Bourbon Bowl numbers so far — editions, competitors, matches, and the first ace.",
};

export default function RecordsPage() {
  const threeTimers = allPlayers.filter((player) => player.years.length === 3).length;
  const matchTotal = 16;

  return (
    <main>
      <SiteHeader />

      <section className="records section-shell" id="records">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">At a glance</p>
            <h2>The numbers<br /><em>so far.</em></h2>
          </div>
          <p>The archive distilled — one career highlight, then the ledger.</p>
        </div>

        <article className="ace-record">
          <p className="eyebrow">Career highlight / 01</p>
          <div className="ace-body">
            <strong>Ace</strong>
            <div className="ace-detail">
              <h3>
                <Link href="/players/stephen-aitken">Stephen Aitken</Link>
              </h3>
              <p>Hole-in-one · Sherman No. 5</p>
            </div>
          </div>
        </article>

        <dl className="record-grid">
          <div>
            <dt>Editions</dt>
            <dd>03</dd>
          </div>
          <div>
            <dt>Competitors</dt>
            <dd>{String(allPlayers.length).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Scheduled matches</dt>
            <dd>{String(matchTotal).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Three-time players</dt>
            <dd>{String(threeTimers).padStart(2, "0")}</dd>
          </div>
        </dl>
      </section>

      <SiteFooter />
    </main>
  );
}
