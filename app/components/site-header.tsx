import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Bourbon Bowl home">
        Bourbon <i>Bowl</i>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#2026">2026</Link>
        <Link href="/#history">History</Link>
        <Link href="/#players">Players</Link>
        <Link href="/#records">Records</Link>
      </nav>
      <p className="edition-mark">Est. 2024<br />Year 03</p>
    </header>
  );
}
