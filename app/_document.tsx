import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
  <Html lang="en">
      <Head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <title>Sanctuary Portal</title>
  <meta name="description" content="Smart Wallet Sanctuary Portal by OpsVantage Digital" />
  <meta name="theme-color" content="#000000" />
  <meta name="robots" content="index, follow" />
  <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; object-src 'none';" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
