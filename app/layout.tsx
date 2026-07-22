import type { Metadata } from "next";
import "./globals.css";

const title = "Bourbon Bowl";
const description = "The annual Bourbon Bowl golf outing.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bourbonbowl.golf"),
  title,
  description,
  icons: {
    icon: [
      { url: "/bourbon_bowl_favicon.svg", type: "image/svg+xml" },
      { url: "/bourbon_bowl_favicon.png", type: "image/png", sizes: "1081x1081" },
    ],
    shortcut: "/bourbon_bowl_favicon.svg",
    apple: "/bourbon_bowl_favicon.png",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "Bourbon Bowl",
    images: [{ url: "/bourbon_bowl_og_image.png", width: 2731, height: 1537, alt: "Bourbon Bowl" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/bourbon_bowl_og_image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
