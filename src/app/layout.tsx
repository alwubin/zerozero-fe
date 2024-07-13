import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo_Black } from "next/font/google";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const archivoBlack = Archivo_Black({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: "zerozero",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-[#212121] ${archivoBlack.variable}`}>
      <body
        className={`${pretendard.className} h-screen mobile:mx-auto mobile:max-w-[480px]`}
      >
        {children}
      </body>
    </html>
  );
}
