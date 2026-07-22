import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "../../components/arrow-icon";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { YearEdition } from "../../components/year-edition";
import { YearNav } from "../../components/year-nav";
import {
  getEditionByYear,
  isYearSlug,
  schedule2026,
  yearSlugs,
  type YearSlug,
} from "../../../lib/editions";
import { currentField } from "../../../lib/players";

type YearPageProps = {
  params: Promise<{ year: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return yearSlugs.map((year) => ({ year }));
}

export async function generateMetadata({ params }: YearPageProps): Promise<Metadata> {
  const { year } = await params;
  if (!isYearSlug(year)) return {};

  if (year === "2026") {
    return {
      title: "2026 — Bourbon Bowl",
      description: "Year Three of the Bourbon Bowl — field, dates, tee times, and status at Union League National.",
    };
  }

  const edition = getEditionByYear(Number(year));
  return {
    title: `${year} — Bourbon Bowl`,
    description: edition
      ? `Bourbon Bowl ${year}: ${edition.champion} champions, teams, captains, and every scheduled match.`
      : `Bourbon Bowl ${year} archive.`,
  };
}

function Year2026Page() {
  const threeTimers = currentField.filter((player) => player.years.length === 3).length;
  const firstPlaying = currentField.find((player) => player.years.length === 1);

  return (
    <>
      <section className="section-shell year-page-intro">
        <div className="section-header compact">
          <div>
            <p className="eyebrow">Current / 03</p>
            <h2>
              The <em>III</em>
              <br />
              Playing
            </h2>
          </div>
          <p>The field is set. The dates are locked. Teams, captains, and pairings are still to be written.</p>
        </div>
        <YearNav current={2026} />
      </section>

      <section className="current-year section-shell" id="year-2026">
        <div className="section-intro">
          <p className="eyebrow">Year Three status</p>
          <h2>
            Locked in.
            <br />
            <em>Still to write.</em>
          </h2>
        </div>
        <div className="current-content">
          <p className="lead">
            Eight players return to Union League National for July 24–25, 2026. Continuity meets a first-time playing appearance.
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
                  <dd>
                    <Link href="/venue">Union League National</Link>
                  </dd>
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
                      <h3>
                        <small>{schedule.day}</small>
                        <time dateTime={schedule.date}>{schedule.label}</time>
                      </h3>
                    </div>
                    <p className="schedule-route">
                      <span>Routing</span>
                      <strong>{schedule.route}</strong>
                    </p>
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
            <Link href="/players">
              View the field <ArrowIcon />
            </Link>
            <Link href="/venue">
              Venue <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <aside className="field-card standalone" aria-labelledby="field-title">
        <div className="field-heading">
          <div>
            <p className="eyebrow">The roster</p>
            <h2 id="field-title">The 2026 Field</h2>
          </div>
          <span className="field-count">{String(currentField.length).padStart(2, "0")}</span>
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
      </aside>
    </>
  );
}

function ArchiveYearPage({ year }: { year: YearSlug }) {
  const edition = getEditionByYear(Number(year));
  if (!edition) notFound();

  return (
    <section className="history section-shell">
      <div className="section-header compact">
        <div>
          <p className="eyebrow">Archive / {edition.index}</p>
          <h2>
            Bourbon Bowl
            <br />
            <em>{edition.year}</em>
          </h2>
        </div>
        <p>
          Champion: {edition.champion}. Full teams, captains, and every scheduled match from Year{" "}
          {Number(edition.index)}.
        </p>
      </div>

      <YearNav current={edition.year} />
      <YearEdition edition={edition} showAnchor={false} />
    </section>
  );
}

export default async function YearPage({ params }: YearPageProps) {
  const { year } = await params;
  if (!isYearSlug(year)) notFound();

  return (
    <main>
      <SiteHeader />
      {year === "2026" ? <Year2026Page /> : <ArchiveYearPage year={year} />}
      <SiteFooter />
    </main>
  );
}
