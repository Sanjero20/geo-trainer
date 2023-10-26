import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geo Trainer PH",
  description: "Memorize Philippines Provinces with Ease",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen min-h-screen">
        <div className="container mx-auto h-full">{children}</div>
      </body>
    </html>
  );
}

export default RootLayout;
