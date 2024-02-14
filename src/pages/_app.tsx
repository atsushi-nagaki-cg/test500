import type { AppProps } from "next/app"
import Error from "next/error"

export default function App({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    )
  }
  return <Component {...pageProps} />
}
