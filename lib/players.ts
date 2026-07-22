export type PlayerTeam = {
  year: number;
  name: string;
};

export type PlayerRole = {
  year: number;
  label: string;
};

export type Championship = {
  year: number;
  team: string;
};

export type Player = {
  name: string;
  initials: string;
  slug: string;
  image: string;
  years: number[];
  teams: PlayerTeam[];
  roles?: PlayerRole[];
  championships?: Championship[];
  highlights?: string[];
  note?: string;
};

export const players: Player[] = [
  {
    name: "Stephen Aitken",
    initials: "SA",
    slug: "stephen-aitken",
    image: "/images/stephen_aitken.png",
    years: [2024, 2025, 2026],
    teams: [
      { year: 2024, name: "Flex Beans" },
      { year: 2025, name: "Big Daddy’s" },
      { year: 2026, name: "To be announced" },
    ],
    roles: [{ year: 2025, label: "Playing captain · Big Daddy’s" }],
    championships: [
      { year: 2024, team: "Flex Beans" },
      { year: 2025, team: "Big Daddy’s" },
    ],
    highlights: ["Hole-in-one · Sherman No. 5"],
    note: "Hole-in-one · Sherman No. 5",
  },
  {
    name: "Billy Annesley",
    initials: "BA",
    slug: "billy-annesley",
    image: "/images/billy_annesley.png",
    years: [2024, 2025, 2026],
    teams: [
      { year: 2024, name: "Down 2 Hang" },
      { year: 2025, name: "BMYP" },
      { year: 2026, name: "To be announced" },
    ],
    roles: [{ year: 2025, label: "Playing captain · BMYP" }],
  },
  {
    name: "Doug Yass",
    initials: "DY",
    slug: "doug-yass",
    image: "/images/doug_yass.png",
    years: [2024, 2025, 2026],
    teams: [
      { year: 2024, name: "Flex Beans" },
      { year: 2025, name: "BMYP" },
      { year: 2026, name: "To be announced" },
    ],
    championships: [{ year: 2024, team: "Flex Beans" }],
  },
  {
    name: "Dirk Nicholas",
    initials: "DN",
    slug: "dirk-nicholas",
    image: "/images/dirk_nicholas.png",
    years: [2024, 2025, 2026],
    teams: [
      { year: 2024, name: "Down 2 Hang" },
      { year: 2025, name: "BMYP" },
      { year: 2026, name: "To be announced" },
    ],
  },
  {
    name: "Matt Lipson",
    initials: "ML",
    slug: "matt-lipson",
    image: "/images/matt_lipson.png",
    years: [2024, 2025, 2026],
    teams: [
      { year: 2024, name: "Down 2 Hang" },
      { year: 2025, name: "Big Daddy’s" },
      { year: 2026, name: "To be announced" },
    ],
    championships: [{ year: 2025, team: "Big Daddy’s" }],
  },
  {
    name: "John Lynch",
    initials: "JL",
    slug: "john-lynch",
    image: "/images/john_lynch.png",
    years: [2026],
    teams: [{ year: 2026, name: "To be announced" }],
    roles: [{ year: 2024, label: "Non-playing captain" }],
    note: "2024 non-playing captain",
  },
  {
    name: "Joey Grubb",
    initials: "JG",
    slug: "joey-grubb",
    image: "/images/joey_grubb.png",
    years: [2024, 2025, 2026],
    teams: [
      { year: 2024, name: "Flex Beans" },
      { year: 2025, name: "BMYP" },
      { year: 2026, name: "To be announced" },
    ],
    championships: [{ year: 2024, team: "Flex Beans" }],
  },
  {
    name: "Balt Heldring",
    initials: "BH",
    slug: "balt-heldring",
    image: "/images/balt_heldring.png",
    years: [2025, 2026],
    teams: [
      { year: 2025, name: "Big Daddy’s" },
      { year: 2026, name: "To be announced" },
    ],
    championships: [{ year: 2025, team: "Big Daddy’s" }],
  },
  {
    name: "Jack Rosenberg",
    initials: "JR",
    slug: "jack-rosenberg",
    image: "/images/jack_rosenberg.png",
    years: [2024],
    teams: [{ year: 2024, name: "Down 2 Hang" }],
  },
  {
    name: "Andrew Somers",
    initials: "AS",
    slug: "andrew-somers",
    image: "/images/andrew_somers.png",
    years: [2024],
    teams: [{ year: 2024, name: "Flex Beans" }],
    championships: [{ year: 2024, team: "Flex Beans" }],
  },
  {
    name: "Phil Origlio",
    initials: "PO",
    slug: "phil-origlio",
    image: "/images/phil_origlio.png",
    years: [2025],
    teams: [{ year: 2025, name: "Big Daddy’s" }],
    roles: [{ year: 2024, label: "Non-playing captain" }],
    championships: [{ year: 2025, team: "Big Daddy’s" }],
    note: "2024 non-playing captain",
  },
];

export const currentField = players.filter((player) => player.years.includes(2026));

export const allPlayers = players.toSorted((a, b) => a.name.localeCompare(b.name));

export function getPlayerBySlug(slug: string) {
  return players.find((player) => player.slug === slug);
}
