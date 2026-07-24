export type Match = {
  time: string;
  left: string;
  right: string;
};

export type Round = {
  number: number;
  format: string;
  course: string;
  holes: number;
  matches: Match[];
};

export type ArchiveTeam = {
  name: string;
  players: string[];
};

export type Edition = {
  year: number;
  index: string;
  champion: string;
  captains: { names: string; note: string };
  teams: [ArchiveTeam, ArchiveTeam];
  rounds: Round[];
};

export type ScheduleDay = {
  date: string;
  day: string;
  label: string;
  route: [from: string, to: string];
  teeTimes: { label: string; dateTime: string }[];
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

export const schedule2026: ScheduleDay[] = [
  {
    date: "2026-07-24",
    day: "Friday",
    label: "July 24",
    route: ["Meade", "Grant"],
    teeTimes: [
      { label: "12:00 PM", dateTime: "2026-07-24T12:00" },
      { label: "12:10 PM", dateTime: "2026-07-24T12:10" },
    ],
  },
  {
    date: "2026-07-25",
    day: "Saturday",
    label: "July 25",
    route: ["Sherman", "Grant"],
    teeTimes: [
      { label: "11:00 AM", dateTime: "2026-07-25T11:00" },
      { label: "11:10 AM", dateTime: "2026-07-25T11:10" },
    ],
  },
];

export const editions: Edition[] = [
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

export const yearSlugs = ["2024", "2025", "2026"] as const;
export type YearSlug = (typeof yearSlugs)[number];

export function getEditionByYear(year: number) {
  return editions.find((edition) => edition.year === year);
}

export function isYearSlug(value: string): value is YearSlug {
  return (yearSlugs as readonly string[]).includes(value);
}
