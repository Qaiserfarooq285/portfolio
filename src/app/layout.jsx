import '@/styles/globals.css';

export const metadata = {
  title: 'Qaiser Farooq | AI Engineer Portfolio',
  description:
    'AI Engineer specializing in Machine Learning, NLP, and Deep Learning. View my projects, skills, and experience.',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
