import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getProviders, getSession, SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import { FC } from 'react'

const fetcher = (...args: any) =>
  // @ts-ignore
  fetch(...args).then((res) => res.json())

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher, refreshInterval: 5000 }}>
        <InnerApp {...pageProps}>
          <Component />
        </InnerApp>
      </SWRConfig>
    </SessionProvider>
  )
}

const InnerApp: FC<any> = ({ trendingResults, followResults, children }) => {
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        {children}
        {/* Widgets */}

        {/* Modal */}
      </main>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )

  return {
    props: {
      trendingResults,
      followResults,
    },
  }
}

export default MyApp
