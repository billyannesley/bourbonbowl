import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { allPlayers, currentField, playerLastName } from "../../lib/players";
import styles from "./players.module.css";

export const metadata: Metadata = {
  title: "Players — Bourbon Bowl",
  description: "The Bourbon Bowl field — past and present. Bios, appearances, and championships.",
  openGraph: {
    title: "Players — Bourbon Bowl",
    description: "The Bourbon Bowl field — past and present. Bios, appearances, and championships.",
  },
};

export default function PlayersPage() {
  const threeTimers = allPlayers.filter((player) => player.years.length === 3).length;

  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.masthead}>
        <div className={styles.mastheadCopy}>
          <p className="eyebrow">Player index</p>
          <h1>The field,<br /><em>past & present.</em></h1>
          <p className={styles.deck}>
            {allPlayers.length} competitors across three Bourbon Bowls. Pick a bio.
          </p>
        </div>
        <dl className={styles.mastheadStats}>
          <div>
            <dt>Competitors</dt>
            <dd>{String(allPlayers.length).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Field ’26</dt>
            <dd>{String(currentField.length).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Three-timers</dt>
            <dd>{String(threeTimers).padStart(2, "0")}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.roster} aria-label="All players">
        {allPlayers.map((player, index) => {
          const bowls = player.years.length;
          const titles = player.championships?.length ?? 0;
          const last = playerLastName(player.name);
          const first = player.name.slice(0, Math.max(0, player.name.length - last.length)).trim();

          return (
            <article key={player.slug}>
              <Link href={`/players/${player.slug}`} className={styles.row}>
                <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.shot}>
                  <Image
                    src={player.image}
                    alt=""
                    width={120}
                    height={120}
                    sizes="(max-width: 860px) 72px, 120px"
                  />
                </div>
                <div className={styles.who}>
                  <h2>
                    {first ? <span>{first}</span> : null}
                    <em>{last}</em>
                  </h2>
                  {player.note ? <small>{player.note}</small> : (
                    <small>{player.years.join(" · ")}</small>
                  )}
                </div>
                <ul className={styles.meta}>
                  <li>
                    <strong>{String(bowls).padStart(2, "0")}</strong>
                    <span>{bowls === 1 ? "Bowl" : "Bowls"}</span>
                  </li>
                  <li>
                    <strong>{String(titles).padStart(2, "0")}</strong>
                    <span>{titles === 1 ? "Title" : "Titles"}</span>
                  </li>
                </ul>
                <b className={styles.cta} aria-hidden="true">View bio</b>
              </Link>
            </article>
          );
        })}
      </section>

      <SiteFooter />
    </main>
  );
}
