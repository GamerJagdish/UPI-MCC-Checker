import {
  ScrollViewStyleReset,
  useServerDocumentContext,
} from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The entire contents of this file will be compiled into a static HTML file at build time.
 */
export default function Root({ children }: PropsWithChildren) {
  const { bodyAttributes, bodyNodes, htmlAttributes, headNodes } =
    useServerDocumentContext();

  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, interactive-widget=resizes-content"
        />

        {/* Primary Meta Tags */}
        <title>
          UPI MCC Checker - Scan &amp; Check UPI Merchant Category Codes
        </title>
        <meta
          name="title"
          content="UPI MCC Checker - Scan & Check UPI Merchant Category Codes"
        />
        <meta
          name="description"
          content="Scan UPI QR codes to find Merchant Category Codes (MCC) and merchant details. Know whether to pay via credit card or bank account before completing transactions."
        />
        <meta
          name="keywords"
          content="UPI, MCC, Merchant Category Code, UPI QR Code, QR Scanner, Credit Card Rewards, Surcharge, Payments, UPI Scanner"
        />
        <meta name="author" content="Jagdish Sharma (GamerJagdish)" />
        <link rel="canonical" href="https://upimcc.gamerjagdish.com/" />
        <meta name="theme-color" content="#38b6ff" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://upimcc.gamerjagdish.com/" />
        <meta
          property="og:title"
          content="UPI MCC Checker - Scan & Check UPI Merchant Category Codes"
        />
        <meta
          property="og:description"
          content="Scan UPI QR codes to find Merchant Category Codes (MCC) and merchant details. Know whether to pay via credit card or bank account before completing transactions."
        />
        <meta
          property="og:image"
          content="https://upimcc.gamerjagdish.com/og-image.png"
        />
        <meta property="og:image:alt" content="UPI MCC Checker" />
        <meta property="og:site_name" content="UPI MCC Checker" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://upimcc.gamerjagdish.com/" />
        <meta
          name="twitter:title"
          content="UPI MCC Checker - Scan & Check UPI Merchant Category Codes"
        />
        <meta
          name="twitter:description"
          content="Scan UPI QR codes to find Merchant Category Codes (MCC) and merchant details. Know whether to pay via credit card or bank account before completing transactions."
        />
        <meta
          name="twitter:image"
          content="https://upimcc.gamerjagdish.com/og-image.png"
        />
        <meta name="twitter:image:alt" content="UPI MCC Checker" />

        {/* Link the PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}

const responsiveBackground = `
html, body, #root {
  width: 100%;
  height: 100%;
  height: 100dvh;
  min-height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
}
body {
  background-color: #000;
  touch-action: manipulation;
}
@media (prefers-color-scheme: light) {
  body {
    background-color: #f8fafc;
  }
}`;
