import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "@/contexts/AuthContext";

const sfproDisplay = localFont({
  src: "./fonts/SFPRODISPLAYREGULAR.otf",
  variable: "--font-sfpro-display",
  display: 'swap'
});

export const metadata = {
  title: "Abia Ride - Your Smooth Ride, Just a Tap Away",
  description: "Experience hassle-free transportation with Abia Ride. Reliable rides, anytime, anywhere.",
  manifest: "/manifest.json",
  themeColor: "#5F13FF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Abia Ride"
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: "Abia Ride",
    title: "Abia Ride - Your Smooth Ride, Just a Tap Away",
    description: "Experience hassle-free transportation with Abia Ride. Reliable rides, anytime, anywhere."
  },
  twitter: {
    card: "summary",
    title: "Abia Ride - Your Smooth Ride, Just a Tap Away",
    description: "Experience hassle-free transportation with Abia Ride. Reliable rides, anytime, anywhere."
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sfproDisplay.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Abia Ride" />
        <link rel="apple-touch-icon" href="/svgs/Logo.svg" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Script id="service-worker" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('SW registered: ', registration);
                  })
                  .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
