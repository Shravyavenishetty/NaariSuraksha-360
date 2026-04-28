import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'NariSuraksha 360 – Women Safety Platform',
  description: 'Real-time safety platform for women.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans bg-gray-50 text-gray-900 min-h-screen`}>
        <Navbar />
        <main className="pt-24 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
