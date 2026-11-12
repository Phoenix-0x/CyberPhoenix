import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import LetterGlitch from "@/components/LetterGlitch";

export const metadata: Metadata = {
  title: "CyberPhoenix",
  description: "Securing Tomorrow's World Today.",
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-letter-glitch">
          <LetterGlitch  />
        </div>
        <Navbar />
        <div className="layout-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
