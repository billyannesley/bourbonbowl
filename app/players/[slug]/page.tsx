import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { allPlayers, getPlayerBySlug, players } from "../../../lib/players";

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

export default async function PlayerProfile({ params }: PlayerProfileProps) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  const championships = player.championships ?? [];
  const roles = player.roles ?? [];

  return (
    <main>
      <SiteHeader />

      <section className="profile-hero">
        <div className="profile-portrait">
          <Image
            src={player.image}
            alt={player.name}
            fill
            priority
            sizes="(max-width: 850px) 100vw, 46vw"
          />
          <span>{player.initials}</span>
        </div>

        <div className="profile-intro">
          <Link className="profile-back" href="/#players">← Player index</Link>
          <p className="eyebrow">Player profile / {player.initials}</p>
          <h1>{player.name}</h1>
          <p className="profile-deck">
            {championships.length > 0
              ? `${championships.length}× Bourbon Bowl champion and ${player.years.length}× competitor.`
              : `${player.years.length}× Bourbon Bowl competitor. Career archive in progress.`}
          </p>
          <div className="profile-statline">
            <div><strong>{String(player.years.length).padStart(2, "0")}</strong><span>Appearances</span></div>
            <div><strong>{String(championships.length).padStart(2, "0")}</strong><span>Team titles</span></div>
            <div><strong>{String(roles.length).padStart(2, "0")}</strong><span>Captaincies</span></div>
          </div>
        </div>
      </section>

      <section className="profile-history section-shell">
        <div className="section-header compact">
          <div><p className="eyebrow">Tournament history</p><h2>Year by<br /><em>year.</em></h2></div>
          <p>Verified appearances, teams, captain roles, and team championships currently in the Bourbon Bowl archive.</p>
        </div>

        <div className="profile-timeline">
          {[2024, 2025, 2026].map((year, index) => {
            const team = player.teams.find((entry) => entry.year === year);
            const role = roles.find((entry) => entry.year === year);
            const championship = championships.find((entry) => entry.year === year);

            return (
              <article key={year}>
                <span>0{index + 1}</span>
                <h3>{year}</h3>
                <div>
                  <small>{team ? "Competitor" : role ? "Captain" : "No appearance"}</small>
                  <strong>{team?.name ?? role?.label ?? "—"}</strong>
                  {role && team ? <p>{role.label}</p> : null}
                </div>
                {championship ? <b>Champion</b> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="profile-record section-shell">
        <div className="section-header compact">
          <div><p className="eyebrow">Career record</p><h2>The archive<br /><em>in progress.</em></h2></div>
          <p>Individual match outcomes are still being reconstructed from the original scorecards.</p>
        </div>

        {player.highlights?.length ? (
          <div className="profile-highlight">
            <span>Known highlight</span>
            <strong>{player.highlights[0]}</strong>
          </div>
        ) : null}

        <div className="future-records">
          <article><span>01</span><h3>Match record</h3><p>Wins, losses, and halves will appear as scorecards are verified.</p></article>
          <article><span>02</span><h3>Partners & opponents</h3><p>Head-to-head history and favorite pairings are coming next.</p></article>
          <article><span>03</span><h3>Awards & moments</h3><p>Photos, side awards, quotes, and trip lore will build over time.</p></article>
        </div>
      </section>

      <section className="profile-directory section-shell" aria-labelledby="more-players">
        <p className="eyebrow">Player index</p>
        <h2 id="more-players">More profiles</h2>
        <div>
          {allPlayers.filter((entry) => entry.slug !== player.slug).map((entry) => (
            <Link href={`/players/${entry.slug}`} key={entry.slug}>
              <Image src={entry.image} alt="" width={54} height={54} sizes="54px" />
              <span>{entry.name}</span>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
