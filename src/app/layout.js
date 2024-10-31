import localFont from "next/font/local";
import "./globals.css";

const sfproDisplay = localFont({
  src: "./fonts/SFPRODISPLAYREGULAR.otf",
  variable: "--font-sfpro-display",
  display: 'swap'
});

export const metadata = {
  title: "Abia Ride",
  description: "Your Ride, Your Way!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sfproDisplay.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
