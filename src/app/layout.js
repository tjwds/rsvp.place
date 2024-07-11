import "./globals.css";

import { Providers } from "./providers";

export const metadata = {
  title: "rsvp.place",
  description: "a place to collect RSVPs for events",
};

export const viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  userScalable: 0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
