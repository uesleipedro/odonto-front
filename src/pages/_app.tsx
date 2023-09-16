import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
    </>
  )
}
