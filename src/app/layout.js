import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParallaxBackground from '../components/ui/ParallaxBackground';
import JsonLd from '../components/seo/JsonLd';
import siteConfig from '../data/site-config.json';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://souhrid.dev'),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    'Souhrid Dey',
    'Data Scientist',
    'Machine Learning Engineer',
    'Financial Data Analyst',
    'Power BI Developer',
    'XGBoost Churn Prediction',
    'Tableau Public',
    'UT Austin PGP Data Science',
    'Agentic GenAI',
    'Pune Data Scientist'
  ],
  authors: [{ name: siteConfig.name, url: 'https://github.com/Souhrid-Dey' }],
  creator: siteConfig.name,
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: 'https://souhrid.dev',
    siteName: 'Souhrid Dey — Data Observatory',
    images: [
      {
        url: '/images/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Souhrid Dey — Data Scientist Portfolio'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/avatar.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <ParallaxBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
