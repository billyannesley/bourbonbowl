import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackIcon } from "../../components/arrow-icon";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { allPlayers, getPlayerBySlug, playerLastName, players } from "../../../lib/players";
import styles from "./profile.module.css";

type PlayerProfileProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return players.map((player) => ({ slug: player.slug }));
}

export async function generateMetadata({ params }: PlayerProfileProps): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    return {};
  }

  const description = `${player.name}’s Bourbon Bowl appearances, teams, championships, and career highlights.`;

  return {
    title: `${player.name} — Bourbon Bowl`,
    description,
    openGraph: {
      title: `${player.name} — Bourbon Bowl`,
      description,
      images: [{ url: player.image, width: 1080, height: 1080, alt: player.name }],
    },
  };
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] ?? "" };
}

export default async function PlayerProfile({ params }: PlayerProfileProps) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  const championships = player.championships ?? [];
  const roles = player.roles ?? [];
  const { first, last } = splitName(player.name);
  const rosterIndex = allPlayers.findIndex((entry) => entry.slug === player.slug);
  const prev = rosterIndex > 0 ? allPlayers[rosterIndex - 1] : allPlayers[allPlayers.length - 1];
  const next = rosterIndex < allPlayers.length - 1 ? allPlayers[rosterIndex + 1] : allPlayers[0];
  const inField = player.years.includes(2026);
  const bowls = player.years.length;
  const seasons = [...player.years].sort((a, b) => a - b);

  const deck = championships.length > 0
    ? `${championships.length}× champion · ${bowls} Bourbon Bowl${bowls === 1 ? "" : "s"}.`
    : roles.length > 0
      ? `${bowls} Bourbon Bowl${bowls === 1 ? "" : "s"} · ${roles[0]?.label}.`
      : `${bowls} Bourbon Bowl${bowls === 1 ? "" : "s"} in the archive.`;

  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.hero} aria-labelledby="player-name">
        <div className={styles.portrait}>
          <Image
            src={player.image}
            alt={player.name}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>

        <div className={styles.identity}>
          <div className={styles.identityTop}>
            <Link className={styles.back} href="/players"><BackIcon /> Field index</Link>
            <p className={styles.jersey}>
              <span>No.</span>
              <strong>{String(rosterIndex + 1).padStart(2, "0")}</strong>
            </p>
          </div>

          <div className={styles.nameBlock}>
            <p className="eyebrow">Bourbon Bowl / Bio</p>
            <h1 id="player-name">
              <span>{first}</span>
              {last ? <em>{last}</em> : null}
            </h1>
            <p className={styles.deck}>{deck}</p>
          </div>

          <ul className={styles.tags} aria-label="Player status">
            <li>{bowls === 1 ? "01 Bowl" : `${String(bowls).padStart(2, "0")} Bowls`}</li>
            {championships.length > 0 ? <li>{String(championships.length).padStart(2, "0")} Titles</li> : null}
            {roles.length > 0 ? <li>Captain</li> : null}
            {inField ? <li>Field ’26</li> : <li>Archive</li>}
          </ul>

          <dl className={styles.statline}>
            <div>
              <dt>Appearances</dt>
              <dd>{String(bowls).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Team titles</dt>
              <dd>{String(championships.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Captaincies</dt>
              <dd>{String(roles.length).padStart(2, "0")}</dd>
            </div>
          </dl>
        </div>
      </section>

      {player.highlights?.length ? (
        <section className={styles.highlight} aria-label="Career highlight">
          <p className="eyebrow">Known highlight</p>
          <p className={styles.highlightText}>
            <em>{player.highlights[0]}</em>
          </p>
        </section>
      ) : null}

      <section className={`${styles.seasons} section-shell`} aria-labelledby="seasons-title">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Season book</p>
            <h2 id="seasons-title">Year by<br /><em>year.</em></h2>
          </div>
          <p>Every Bourbon Bowl appearance on record — team, role, and result.</p>
        </div>

        <div className={styles.seasonGrid}>
          {seasons.map((year) => {
            const team = player.teams.find((entry) => entry.year === year);
            const role = roles.find((entry) => entry.year === year);
            const championship = championships.find((entry) => entry.year === year);

            return (
              <article key={year} className={championship ? styles.seasonWin : undefined}>
                <header>
                  <span>{year === 2026 ? "Current" : "Archive"}</span>
                  <h3>{year}</h3>
                </header>
                <div className={styles.seasonBody}>
                  <p className={styles.teamName}>{team?.name ?? "—"}</p>
                  {role ? <p className={styles.role}>{role.label}</p> : null}
                </div>
                {championship ? <b>Champion</b> : <b className={styles.mutedBadge}>Competed</b>}
              </article>
            );
          })}
        </div>
      </section>

      {player.handicap ? (
        <section className={`${styles.handicap} section-shell`} aria-labelledby="handicap-title">
          <div className="section-header compact">
            <div>
              <p className="eyebrow">Year Three / Handicap card</p>
              <h2 id="handicap-title">Playing<br /><em>numbers.</em></h2>
            </div>
            <p>Official 2026 Bourbon Bowl handicap card for the Blue tees. Strokes are shown off the low player.</p>
          </div>
          <dl className={styles.handicapGrid}>
            <div>
              <dt>Tee</dt>
              <dd>{player.handicap.tee}</dd>
            </div>
            <div>
              <dt>Handicap index</dt>
              <dd>{player.handicap.handicapIndex.toFixed(1)}</dd>
            </div>
            <div>
              <dt>Course handicap</dt>
              <dd>{player.handicap.courseHandicap}</dd>
            </div>
            <div>
              <dt>Playing handicap</dt>
              <dd>{player.handicap.playingHandicap}</dd>
            </div>
            <div>
              <dt>Strokes off</dt>
              <dd>{player.handicap.strokesOff}</dd>
            </div>
          </dl>
        </section>
      ) : null}

      <nav className={styles.pager} aria-label="Adjacent players">
        <Link href={`/players/${prev.slug}`} className={styles.pagerLink}>
          <small>Previous</small>
          <strong>{playerLastName(prev.name)}</strong>
          <Image src={prev.image} alt="" width={56} height={56} sizes="56px" />
        </Link>
        <Link href={`/players/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <Image src={next.image} alt="" width={56} height={56} sizes="56px" />
          <small>Next</small>
          <strong>{playerLastName(next.name)}</strong>
        </Link>
      </nav>

      <section className={`${styles.roster} section-shell`} aria-labelledby="roster-title">
        <div className={styles.rosterHead}>
          <p className="eyebrow">The field</p>
          <h2 id="roster-title">More<br /><em>bios.</em></h2>
        </div>
        <div className={styles.rosterGrid}>
          {allPlayers
            .filter((entry) => entry.slug !== player.slug)
            .map((entry, index) => (
              <Link href={`/players/${entry.slug}`} key={entry.slug} className={styles.rosterCard}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Image src={entry.image} alt="" width={72} height={72} sizes="72px" />
                <div>
                  <strong>{entry.name}</strong>
                  <small>
                    {entry.years.length === 1 ? "01 Bowl" : `${String(entry.years.length).padStart(2, "0")} Bowls`}
                    {entry.championships?.length ? " · Champion" : ""}
                  </small>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
