import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ForwardIcon } from "./components/arrow-icon";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { editions } from "../lib/editions";
import { allPlayers, currentField } from "../lib/players";

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="vertical-note">Clubhouse archive · 2024—2026</p>
          <p className="eyebrow">Bourbon Bowl / Year Three</p>
          <h1>
            The <em>III</em>
            <br />
            Playing
          </h1>
          <div className="hero-statline">
            <strong>Eight players.</strong>
            <span>One bowl.</span>
          </div>
          <div className="hero-archive" aria-label="Bourbon Bowl editions">
            <Link href="/2024">
              <small>Archive / 01</small>
              <b>2024</b>
              <ArrowIcon />
            </Link>
            <Link href="/2025">
              <small>Archive / 02</small>
              <b>2025</b>
              <ArrowIcon />
            </Link>
            <Link className="current" href="/2026">
              <small>Current / 03</small>
              <b>2026</b>
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <aside className="field-card" aria-labelledby="field-title">
          <div className="field-heading">
            <div>
              <p className="eyebrow">The roster</p>
              <h2 id="field-title">The 2026 Field</h2>
            </div>
            <span className="field-count">08</span>
          </div>
          <ol className="field-list">
            {currentField.map((player, index) => (
              <li key={player.name}>
                <Link href={`/players/${player.slug}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Image src={player.image} alt="" width={46} height={46} sizes="46px" />
                  <strong>{player.name}</strong>
                  <abbr title={`${player.name} playing handicap`}>PH {player.handicap?.playingHandicap}</abbr>
                </Link>
              </li>
            ))}
          </ol>
          <p className="motto">
            <em>Respect.</em>
            <em>Honesty.</em>
            <em>Courage.</em>
          </p>
        </aside>
      </section>

      <section className="current-year section-shell">
        <div className="section-intro">
          <p className="eyebrow">Current / 03</p>
          <h2>
            Year Three
            <br />
            <em>starts here.</em>
          </h2>
        </div>
        <div className="current-content">
          <p className="lead">
            The field is set. Union League National is home. The dates and tee times are locked; teams, captains, and pairings are still to be written.
          </p>
          <div className="current-actions">
            <Link href="/2026">
              Open Year Three <ArrowIcon />
            </Link>
            <Link href="/venue">
              Venue <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="venue" aria-labelledby="home-venue-title">
        <div className="venue-brand">
          <p className="eyebrow">Official venue / Swainton, New Jersey</p>
          <Image
            src="/UNL_bb_wordmark.svg"
            alt="Union League National"
            width={801}
            height={301}
            sizes="(max-width: 1050px) 86vw, 43vw"
          />
          <p className="venue-address">1765 Route 9 North · Swainton, NJ 08210</p>
        </div>
        <div className="venue-content">
          <p className="eyebrow">The home course</p>
          <h2 id="home-venue-title">
            Where the
            <br />
            <em>Bowl is played.</em>
          </h2>
          <p className="venue-lead">
            The Bourbon Bowl is played at Union League National Golf Club, a 27-hole course built around three distinct nines: Grant, Meade, and Sherman.
          </p>
          <div className="venue-facts" aria-label="Venue facts">
            <div>
              <strong>27</strong>
              <span>Holes</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Nines</span>
            </div>
            <div>
              <strong>NJ</strong>
              <span>Swainton</span>
            </div>
          </div>
          <Link className="venue-link" href="/venue">
            Venue page <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="history section-shell">
        <div className="section-header">
          <div>
            <p className="eyebrow">The archive</p>
            <h2>
              Every pairing.
              <br />
              <em>Every year.</em>
            </h2>
          </div>
          <p>Two completed editions — champions, teams, and every scheduled match in the archive.</p>
        </div>

        <nav className="history-jump" aria-label="Jump to year pages">
          {editions.map((edition) => (
            <Link href={`/${edition.year}`} key={edition.year}>
              <small>Archive / {edition.index}</small>
              <b>{edition.year}</b>
              <span>{edition.champion}</span>
            </Link>
          ))}
          <Link href="/2026">
            <small>Current / 03</small>
            <b>2026</b>
            <span>The Third Playing</span>
          </Link>
        </nav>

        <p className="section-cta">
          <Link href="/history">Full history <ForwardIcon /></Link>
        </p>
      </section>

      <section className="players section-shell">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Player index</p>
            <h2>
              The field,
              <br />
              <em>past & present.</em>
            </h2>
          </div>
          <p>Eleven competitors have appeared across the first three Bourbon Bowls.</p>
        </div>
        <div className="player-index">
          {allPlayers.slice(0, 6).map((player, index) => {
            const bowls = player.years.length;

            return (
              <article key={player.name}>
                <Link href={`/players/${player.slug}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Image src={player.image} alt="" width={64} height={64} sizes="64px" />
                  <div>
                    <h3>{player.name}</h3>
                    {player.note ? <small>{player.note}</small> : null}
                  </div>
                  <p>{player.years.join(" · ")}</p>
                  <b>
                    <strong>{String(bowls).padStart(2, "0")}</strong>
                    <small>{bowls === 1 ? "Bowl" : "Bowls"}</small>
                  </b>
                </Link>
              </article>
            );
          })}
        </div>
        <p className="section-cta">
          <Link href="/players">All player bios <ForwardIcon /></Link>
        </p>
      </section>

      <section className="records section-shell">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">At a glance</p>
            <h2>
              The numbers
              <br />
              <em>so far.</em>
            </h2>
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

        <p className="section-cta">
          <Link href="/records">Full records <ForwardIcon /></Link>
        </p>
      </section>

      <section className="mark-section" aria-label="Bourbon Bowl mark">
        <div className="mark-stage">
          <Image
            className="mark-trophy"
            src="/bourbonbowl_icon.svg"
            alt="Bourbon Bowl trophy"
            width={754}
            height={855}
            sizes="(max-width: 860px) 70vw, min(42vw, 420px)"
            unoptimized
          />
        </div>
        <p className="mark-word">
          Bourbon <em>Bowl</em>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
