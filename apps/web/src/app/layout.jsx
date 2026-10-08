// ui-spec: design-system/dormio/pages/home.md
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'Dormio — Find Hostels, PGs & Messes by Area',
  description:
    'Verified student hostels, PGs, and daily meal messes near your campus with direct UPI payments and resident stay manager.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-canvas text-foreground font-body antialiased selection:bg-secondary selection:text-secondary-foreground">
        {children}
      </body>
    </html>
  );
}
