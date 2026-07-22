import Link from "next/link";
import { Fragment } from "react";
import type { Edition } from "../../lib/editions";
import { getPlayerByName } from "../../lib/players";

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

export function YearEdition({
  edition,
  showAnchor = true,
}: {
  edition: Edition;
  showAnchor?: boolean;
}) {
  const matchCount = edition.rounds.reduce((total, round) => total + round.matches.length, 0);

  return (
    <article className="year-record" id={showAnchor ? `year-${edition.year}` : undefined}>
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
          <section
            className="round-block"
            key={`${edition.year}-${round.number}`}
            aria-labelledby={`round-${edition.year}-${round.number}`}
          >
            <header className="round-heading">
              <div>
                <span>Round {String(round.number).padStart(2, "0")}</span>
                <h4 id={`round-${edition.year}-${round.number}`}>{round.format}</h4>
              </div>
              <p>
                <strong>{round.course}</strong>
                <small>
                  {round.holes} holes · {round.matches.length} matches
                </small>
              </p>
            </header>
            <ol className="scorecard">
              {round.matches.map((match, index) => (
                <li key={`${match.time}-${index}`}>
                  <time>{match.time}</time>
                  <div className="scorecard-sides">
                    <span className="side-a">
                      <LinkedNames names={match.left} />
                    </span>
                    <b>vs</b>
                    <span className="side-b">
                      <LinkedNames names={match.right} />
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <p className="archive-note">
        <span /> Match-by-match results awaiting archive
      </p>
    </article>
  );
}
