"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const navLinks = [
  { href: "/2026", label: "2026" },
  { href: "/venue", label: "Venue" },
  { href: "/history", label: "History" },
  { href: "/players", label: "Players" },
  { href: "/records", label: "Records" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header${open ? " menu-open" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Bourbon Bowl home">
        <Image
          className="wordmark-icon"
          src="/bourbonbowl_icon.svg"
          alt=""
          width={44}
          height={50}
          priority
        />
        <span>
          Bourbon <i>Bowl</i>
        </span>
      </Link>

      <nav className="site-nav-desktop" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <p className="edition-mark">
        Est. 2024
        <br />
        Year 03
      </p>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menu-toggle-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>

      <div
        className="site-nav-mobile"
        id={menuId}
        hidden={!open}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <p className="site-nav-mobile-foot">Respect. Honesty. Courage.</p>
      </div>
    </header>
  );
}
