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
  description: "A cinematic live research presentation analyzing seasonal disease patterns in Maharashtra using NCDC/IDSP surveillance data alongside primary qualitative fieldwork in Nallasopara West. B.Sc. Data Science Semester III Field Project by Khan Umar, RP Institute, University of Mumbai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#171A18] text-[#F1EBDD] selection:bg-[#B89B5E] selection:text-[#171A18]">
        <PresentationNav />
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
