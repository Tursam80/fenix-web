import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fenix Web',
  description: 'Mevcut Fenix SQL Server veritabanına bağlı web istemcisi'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
