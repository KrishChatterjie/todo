import '../styles/globals.css'
import './../styles/index.css'
import './../styles/form.css'
import './../styles/tasks.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
