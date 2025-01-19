import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Archivo_Black } from 'next/font/google';
import './globals.css';
import { META } from '@/app/constants/metadata';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const archivoBlack = Archivo_Black({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-archivo-black',
});

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  keywords: [...META.keyword],
  openGraph: {
    title: META.title,
    description: META.description,
    locale: 'ko_KR',
    type: 'website',
    url: META.url,
    images: {
      url: `${META.url}${META.ogImage}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-[#212121] ${archivoBlack.variable}`}>
      <body
        className={`${pretendard.className} mx-auto h-screen w-full max-w-[430px] `}
      >
        {children}
      </body>
    </html>
  );
}
