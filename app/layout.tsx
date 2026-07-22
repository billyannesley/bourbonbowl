import type { Metadata } from "next";
import "./globals.css";

const title = "Bourbon Bowl — The Clubhouse Archive";
const description = "Players, pairings, and history from the annual Bourbon Bowl golf outing.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bourbonbowl.golf"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "Bourbon Bowl",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Bourbon Bowl — The Third Playing" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
