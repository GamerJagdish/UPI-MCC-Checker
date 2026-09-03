import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The entire contents of this file will be compiled into a static HTML file at build time.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, interactive-widget=resizes-content"
        />

        {/* Link the PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
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
