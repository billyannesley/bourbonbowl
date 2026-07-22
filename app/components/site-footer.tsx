import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <Link className="wordmark" href="/">Bourbon <i>Bowl</i></Link>
      <p>Respect. Honesty. Courage.</p>
      <span>2024—2026</span>
    </footer>
  );
}
