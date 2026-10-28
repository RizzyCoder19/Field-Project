import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import PresentationNav from "@/components/PresentationNav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "From Data to the Ground | Seasonal Disease Patterns in Maharashtra",
  description: "An editorial research experience analysing seasonal disease outbreak patterns in Maharashtra using NCDC/IDSP surveillance data (2022–2025), paired with field evidence from Nallasopara West. B.Sc. Data Science Field Project by Khan Umar, RP Institute, University of Mumbai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070A0F] text-[#F0DECE] selection:bg-[#8B1414] selection:text-[#F0DECE]">
        <PresentationNav />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
