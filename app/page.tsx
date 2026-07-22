import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { allPlayers, currentField, getPlayerByName } from "../lib/players";

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

type ArchiveTeam = {
  name: string;
  players: string[];
};

type Edition = {
  year: number;
  index: string;
  champion: string;
  captains: { names: string; note: string };
  teams: [ArchiveTeam, ArchiveTeam];
  rounds: Round[];
};

const rounds2024: Round[] = [
  {
    number: 1,
    format: "Better Ball",
    course: "Meade / Sherman",
    holes: 18,
    matches: [
      { time: "10:10 AM", left: "Billy Annesley / Jack Rosenberg", right: "Joey Grubb / Andrew Somers" },
      { time: "10:20 AM", left: "Matt Lipson / Dirk Nicholas", right: "Stephen Aitken / Douglas Yass" },
    ],
  },
  {
    number: 2,
    format: "Two-Man Scramble",
    course: "Sherman or Meade",
    holes: 9,
    matches: [
      { time: "5:30 PM", left: "Billy Annesley / Dirk Nicholas", right: "Stephen Aitken / Andrew Somers" },
      { time: "5:40 PM", left: "Matt Lipson / Jack Rosenberg", right: "Joey Grubb / Douglas Yass" },
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
      { time: "9:00 AM", left: "Matt Lipson", right: "Douglas Yass" },
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
      { time: "11:00 AM", left: "Stephen Aitken / Phil Origlio", right: "Dirk Nicholas / Douglas Yass" },
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
      { time: "5:10 PM", left: "Balt Heldring / Phil Origlio", right: "Joey Grubb / Douglas Yass" },
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
      { time: "11:10 AM", left: "Phil Origlio", right: "Douglas Yass" },
    ],
  },
];

const schedule2026 = [
  {
    date: "2026-07-24",
    day: "Friday",
    label: "July 24",
    route: "Meade → Grant",
    teeTimes: [
      { label: "12:00 PM", dateTime: "2026-07-24T12:00" },
      { label: "12:10 PM", dateTime: "2026-07-24T12:10" },
    ],
  },
  {
    date: "2026-07-25",
    day: "Saturday",
    label: "July 25",
    route: "Sherman → Grant",
    teeTimes: [
      { label: "11:00 AM", dateTime: "2026-07-25T11:00" },
      { label: "11:10 AM", dateTime: "2026-07-25T11:10" },
    ],
  },
] as const;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

const editions: Edition[] = [
  {
    year: 2024,
    index: "01",
    champion: "Flex Beans",
    captains: { names: "Phil Origlio & John Lynch", note: "Non-playing captains" },
    teams: [
      {
        name: "Flex Beans",
        players: ["Stephen Aitken", "Joey Grubb", "Andrew Somers", "Douglas Yass"],
      },
      {
        name: "Down 2 Hang",
        players: ["Billy Annesley", "Matt Lipson", "Dirk Nicholas", "Jack Rosenberg"],
      },
    ],
    rounds: rounds2024,
  },
  {
    year: 2025,
    index: "02",
    champion: "Big Daddy’s",
    captains: { names: "Stephen Aitken & Billy Annesley", note: "Playing captains" },
    teams: [
      {
        name: "Big Daddy’s",
        players: ["Stephen Aitken", "Balt Heldring", "Matt Lipson", "Phil Origlio"],
      },
      {
        name: "BMYP",
        players: ["Billy Annesley", "Joey Grubb", "Dirk Nicholas", "Douglas Yass"],
      },
    ],
    rounds: rounds2025,
  },
];

function LinkedNames({ names }: { names: string }) {
  const parts = names.split(" / ");

  return (
    <>
      {parts.map((name, index) => {
        const player = getPlayerByName(name);
        const label = player ? (
          <Link href={`/players/${player.slug}`}>{name}</Link>
        ) : (
          <span>{name}</span>
        );

        return (
          <Fragment key={`${name}-${index}`}>
            {index > 0 ? <i aria-hidden="true"> / </i> : null}
            {label}
          </Fragment>
        );
      })}
    </>
  );
}

function YearEdition({ edition }: { edition: Edition }) {
  const matchCount = edition.rounds.reduce((total, round) => total + round.matches.length, 0);

  return (
    <article className="year-record" id={`year-${edition.year}`}>
      <header className="edition-masthead">
        <div className="edition-year">
          <p className="eyebrow">Archive / {edition.index}</p>
          <h3>{edition.year}</h3>
          <p className="edition-summary">
            {edition.rounds.length} rounds · {matchCount} matches · 2 teams
          </p>
        </div>
        <div className="edition-champion">
          <span>Champion</span>
          <strong>{edition.champion}</strong>
        </div>
      </header>

      <div className="team-faceoff" aria-label={`${edition.year} teams`}>
        {edition.teams.map((team, index) => {
          const won = team.name === edition.champion;

          return (
            <Fragment key={team.name}>
              {index === 1 ? (
                <div className="faceoff-divider" aria-hidden="true">
                  <span>vs</span>
                </div>
              ) : null}
              <div className={`faceoff-side${won ? " winner" : ""}`}>
                <p className="faceoff-result">{won ? "Champion" : "Runner-up"}</p>
                <h4 className="faceoff-team">{team.name}</h4>
                <ul className="faceoff-roster">
                  {team.players.map((name, playerIndex) => {
                    const player = getPlayerByName(name);
                    return (
                      <li key={name}>
                        <span>{String(playerIndex + 1).padStart(2, "0")}</span>
                        {player ? <Link href={`/players/${player.slug}`}>{name}</Link> : <strong>{name}</strong>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Fragment>
          );
        })}
      </div>

      <p className="edition-captains">
        <span>Captains</span>
        <strong>{edition.captains.names}</strong>
        <small>{edition.captains.note}</small>
      </p>

      <div className="edition-rounds">
        {edition.rounds.map((round) => (
          <section className="round-block" key={`${edition.year}-${round.number}`} aria-labelledby={`round-${edition.year}-${round.number}`}>
            <header className="round-heading">
              <div>
                <span>Round {String(round.number).padStart(2, "0")}</span>
                <h4 id={`round-${edition.year}-${round.number}`}>{round.format}</h4>
              </div>
              <p>
                <strong>{round.course}</strong>
                <small>{round.holes} holes · {round.matches.length} matches</small>
              </p>
            </header>
            <ol className="scorecard">
              {round.matches.map((match, index) => (
                <li key={`${match.time}-${index}`}>
                  <time>{match.time}</time>
                  <div className="scorecard-sides">
                    <span className="side-a"><LinkedNames names={match.left} /></span>
                    <b>vs</b>
                    <span className="side-b"><LinkedNames names={match.right} /></span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <p className="archive-note"><span /> Match-by-match results awaiting archive</p>
    </article>
  );
}

export default function Home() {
  const threeTimers = currentField.filter((player) => player.years.length === 3).length;
  const firstPlaying = currentField.find((player) => player.years.length === 1);

  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="vertical-note">Clubhouse archive · 2024—2026</p>
          <p className="eyebrow">Bourbon Bowl / Year Three</p>
          <h1>The <em>III</em><br />Playing</h1>
          <div className="hero-statline">
            <strong>Eight players.</strong>
            <span>One bowl.</span>
          </div>
          <div className="hero-archive" aria-label="Bourbon Bowl editions">
            <a href="#year-2024"><small>Archive / 01</small><b>2024</b><ArrowIcon /></a>
            <a href="#year-2025"><small>Archive / 02</small><b>2025</b><ArrowIcon /></a>
            <a className="current" href="#year-2026"><small>Current / 03</small><b>2026</b><ArrowIcon /></a>
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
          <p className="motto"><em>Respect.</em><em>Honesty.</em><em>Courage.</em></p>
        </aside>
      </section>

      <section className="current-year section-shell" id="year-2026">
        <div className="section-intro">
          <p className="eyebrow">Current / 03</p>
          <h2>Year Three<br /><em>starts here.</em></h2>
        </div>
        <div className="current-content">
          <p className="lead">
            The field is set. Union League National is home. The dates and tee times are locked; teams, captains, and pairings are still to be written.
          </p>

          <div className="status-board" aria-label="Year Three status">
            <div className="status-group">
              <p className="status-label">Locked in</p>
              <dl className="status-rows">
                <div>
                  <dt>Field</dt>
                  <dd>{String(currentField.length).padStart(2, "0")} players</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>Union League National</dd>
                </div>
                <div>
                  <dt>Dates</dt>
                  <dd>July 24–25, 2026</dd>
                </div>
                <div>
                  <dt>Continuity</dt>
                  <dd>
                    {threeTimers} three-time players
                    {firstPlaying ? ` · ${firstPlaying.name.split(" ").slice(-1)[0]}’s first playing year` : null}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="status-group">
              <p className="status-label">Confirmed tee times</p>
              <div className="schedule-days">
                {schedule2026.map((schedule, index) => (
                  <article key={schedule.date}>
                    <div className="schedule-heading">
                      <span>Day {String(index + 1).padStart(2, "0")}</span>
                      <h3><small>{schedule.day}</small><time dateTime={schedule.date}>{schedule.label}</time></h3>
                    </div>
                    <p className="schedule-route"><span>Routing</span><strong>{schedule.route}</strong></p>
                    <ol>
                      {schedule.teeTimes.map((teeTime) => (
                        <li key={teeTime.dateTime}>
                          <time dateTime={teeTime.dateTime}>{teeTime.label}</time>
                          <span>Pairing TBA</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>
            </div>

            <div className="status-group">
              <p className="status-label">Still to write</p>
              <dl className="status-rows pending">
                <div>
                  <dt>Teams</dt>
                  <dd>TBA</dd>
                </div>
                <div>
                  <dt>Captains</dt>
                  <dd>TBA</dd>
                </div>
                <div>
                  <dt>Pairings</dt>
                  <dd>TBA</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="current-actions">
            <a href="#top">View the field <ArrowIcon /></a>
            <a href="#venue">Venue <ArrowIcon /></a>
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
          <p>Two completed editions. Champions first, then the field, then every scheduled match — ready for scorecards when they surface.</p>
        </div>

        <nav className="history-jump" aria-label="Jump to archive year">
          {editions.map((edition) => (
            <a href={`#year-${edition.year}`} key={edition.year}>
              <small>Archive / {edition.index}</small>
              <b>{edition.year}</b>
              <span>{edition.champion}</span>
            </a>
          ))}
        </nav>

        {editions.map((edition) => (
          <YearEdition edition={edition} key={edition.year} />
        ))}
      </section>

      <section className="players section-shell" id="players">
        <div className="section-header compact">
          <div><p className="eyebrow">Player index</p><h2>The field,<br /><em>past & present.</em></h2></div>
          <p>Eleven competitors have appeared across the first three Bourbon Bowls.</p>
        </div>
        <div className="player-index">
          {allPlayers.map((player, index) => {
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
        <p className="mark-word">Bourbon <em>Bowl</em></p>
      </section>

      <SiteFooter />
    </main>
  );
}
