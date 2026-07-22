import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { allPlayers, currentField } from "../lib/players";

type Match = {
  time: string;
  left: string;
  right: string;
};

type Round = {
  number: number;
  format: string;
  course: string;
  holes: number;
  matches: Match[];
};

const rounds2024: Round[] = [
  {
    number: 1,
    format: "Better Ball",
    course: "Meade / Sherman",
    holes: 18,
    matches: [
      { time: "10:10 AM", left: "Billy Annesley / Jack Rosenberg", right: "Joey Grubb / Andrew Somers" },
      { time: "10:20 AM", left: "Matt Lipson / Dirk Nicholas", right: "Stephen Aitken / Doug Yass" },
    ],
  },
  {
    number: 2,
    format: "Two-Man Scramble",
    course: "Sherman or Meade",
    holes: 9,
    matches: [
      { time: "5:30 PM", left: "Billy Annesley / Dirk Nicholas", right: "Stephen Aitken / Andrew Somers" },
      { time: "5:40 PM", left: "Matt Lipson / Jack Rosenberg", right: "Joey Grubb / Doug Yass" },
    ],
  },
  {
    number: 3,
    format: "Individual Match Play",
    course: "Grant / Meade",
    holes: 18,
    matches: [
      { time: "8:50 AM", left: "Dirk Nicholas", right: "Stephen Aitken" },
      { time: "8:50 AM", left: "Jack Rosenberg", right: "Joey Grubb" },
      { time: "9:00 AM", left: "Billy Annesley", right: "Andrew Somers" },
      { time: "9:00 AM", left: "Matt Lipson", right: "Doug Yass" },
    ],
  },
];

const rounds2025: Round[] = [
  {
    number: 1,
    format: "Better Ball",
    course: "Meade / Sherman",
    holes: 18,
    matches: [
      { time: "11:00 AM", left: "Stephen Aitken / Phil Origlio", right: "Dirk Nicholas / Doug Yass" },
      { time: "11:10 AM", left: "Matt Lipson / Balt Heldring", right: "Billy Annesley / Joey Grubb" },
    ],
  },
  {
    number: 2,
    format: "Two-Man Scramble",
    course: "Grant / Sherman / Meade",
    holes: 18,
    matches: [
      { time: "5:00 PM", left: "Stephen Aitken / Matt Lipson", right: "Dirk Nicholas / Billy Annesley" },
      { time: "5:10 PM", left: "Balt Heldring / Phil Origlio", right: "Joey Grubb / Doug Yass" },
    ],
  },
  {
    number: 3,
    format: "Individual Match Play",
    course: "Grant / Sherman",
    holes: 18,
    matches: [
      { time: "11:00 AM", left: "Stephen Aitken", right: "Joey Grubb" },
      { time: "11:00 AM", left: "Balt Heldring", right: "Dirk Nicholas" },
      { time: "11:10 AM", left: "Matt Lipson", right: "Billy Annesley" },
      { time: "11:10 AM", left: "Phil Origlio", right: "Doug Yass" },
    ],
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function MatchArchive({ year, rounds }: { year: number; rounds: Round[] }) {
  const is2024 = year === 2024;
  const champion = is2024 ? "Flex Beans" : "Big Daddy’s";

  return (
    <article className="year-record" id={`year-${year}`}>
      <header className="record-heading">
        <div>
          <p className="eyebrow">Archive / {year === 2024 ? "01" : "02"}</p>
          <h3>{year}</h3>
        </div>
        <div className="captain-note">
          <span>Captains</span>
          <strong>
            {is2024 ? "Phil Origlio & John Lynch" : "Stephen Aitken & Billy Annesley"}
          </strong>
          <small>{is2024 ? "Non-playing" : "Playing captains"}</small>
        </div>
      </header>

      <div className="team-grid">
        <div>
          <p className="team-label">{is2024 ? "Flex Beans" : "Big Daddy’s"}</p>
          <p>{is2024 ? "Aitken · Grubb · Somers · Yass" : "Aitken · Heldring · Lipson · Origlio"}</p>
        </div>
        <div>
          <p className="team-label">{is2024 ? "Down 2 Hang" : "BMYP"}</p>
          <p>{is2024 ? "Annesley · Lipson · Nicholas · Rosenberg" : "Annesley · Grubb · Nicholas · Yass"}</p>
        </div>
      </div>

      <div className="rounds-grid">
        {rounds.map((round) => (
          <section className="round-card" key={`${year}-${round.number}`}>
            <div className="round-meta">
              <span>Round {round.number}</span>
              <span>{round.holes} holes</span>
            </div>
            <h4>{round.format}</h4>
            <p className="course">{round.course}</p>
            <div className="matches">
              {round.matches.map((match, index) => (
                <div className="match" key={`${match.time}-${index}`}>
                  <time>{match.time}</time>
                  <div>
                    <span>{match.left}</span>
                    <b>vs.</b>
                    <span>{match.right}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="archive-outcome">
        <p className="champion"><span>Champion</span><strong>{champion}</strong></p>
        <p className="pending-result"><span /> Match-by-match results awaiting archive</p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="vertical-note">Clubhouse archive · 2024—2026</p>
          <p className="eyebrow">Bourbon Bowl / Year Three</p>
          <h1>The <em>Third</em><br />Playing</h1>
          <div className="hero-statline">
            <strong>Eight players.</strong>
            <span>One bowl.</span>
          </div>
          <div className="hero-archive" aria-label="Bourbon Bowl editions">
            <a href="#year-2024"><small>Archive / 01</small><b>2024</b><ArrowIcon /></a>
            <a href="#year-2025"><small>Archive / 02</small><b>2025</b><ArrowIcon /></a>
            <a className="current" href="#2026"><small>Current / 03</small><b>2026</b><ArrowIcon /></a>
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
                  <abbr title={player.name}>{player.initials}</abbr>
                </Link>
              </li>
            ))}
          </ol>
          <p className="motto"><em>Respect.</em><em>Honesty.</em><em>Courage.</em></p>
        </aside>
      </section>

      <section className="current-year section-shell" id="2026">
        <div className="section-intro">
          <p className="eyebrow">Current / 03</p>
          <h2>Year Three<br /><em>starts here.</em></h2>
        </div>
        <div className="current-content">
          <p className="lead">The field is set. Union League National is home. The teams, captains, and match card are still to be written.</p>
          <div className="appearance-grid">
            {currentField.map((player) => (
              <Link className="appearance" href={`/players/${player.slug}`} key={player.name}>
                <Image src={player.image} alt="" width={48} height={48} sizes="48px" />
                <div><strong>{player.name}</strong><small>{player.years.length} {player.years.length === 1 ? "appearance" : "appearances"}</small></div>
                <b>{player.years.length === 3 ? "III" : player.years.length === 2 ? "II" : "I"}</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="venue" id="venue" aria-labelledby="venue-title">
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
          <h2 id="venue-title">Where the<br /><em>Bowl is played.</em></h2>
          <p className="venue-lead">The Bourbon Bowl is played at Union League National Golf Club, a 27-hole course built around three distinct nines: Grant, Meade, and Sherman.</p>
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

      <section className="history section-shell" id="history">
        <div className="section-header">
          <div><p className="eyebrow">The archive</p><h2>Every pairing.<br /><em>Every year.</em></h2></div>
          <p>Two editions, sixteen scheduled matches, and one evolving record. Results can be added as the original scorecards surface.</p>
        </div>
        <MatchArchive year={2024} rounds={rounds2024} />
        <MatchArchive year={2025} rounds={rounds2025} />
      </section>

      <section className="players section-shell" id="players">
        <div className="section-header compact">
          <div><p className="eyebrow">Player index</p><h2>The field,<br /><em>past & present.</em></h2></div>
          <p>Eleven competitors have appeared across the first three Bourbon Bowls.</p>
        </div>
        <div className="player-index">
          {allPlayers.map((player, index) => (
            <article key={player.name}>
              <Link href={`/players/${player.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Image src={player.image} alt="" width={64} height={64} sizes="64px" />
                <div><h3>{player.name}</h3>{player.note ? <small>{player.note}</small> : null}</div>
                <p>{player.years.join(" · ")}</p>
                <b>{player.years.length}</b>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="records section-shell" id="records">
        <div className="section-header compact">
          <div><p className="eyebrow">At a glance</p><h2>The numbers<br /><em>so far.</em></h2></div>
          <p>Verified from the original match posters, confirmed team winners, and the announced Year 3 field.</p>
        </div>
        <div className="record-grid">
          <div><strong>03</strong><span>Editions</span></div>
          <div><strong>11</strong><span>Competitors</span></div>
          <div><strong>16</strong><span>Scheduled matches</span></div>
          <div><strong>06</strong><span>Three-time players</span></div>
        </div>
        <article className="ace-record">
          <p className="eyebrow">Career highlight / 01</p>
          <div>
            <strong>Ace</strong>
            <h3>Stephen Aitken</h3>
            <p>Hole-in-one · Sherman No. 5</p>
          </div>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
