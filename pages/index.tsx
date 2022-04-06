import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { Provider } from 'next-auth/providers'
import Login from '../components/Login'

type HomeProps = {
  trendingResults: Object
  followResults: Object
  providers: Provider[]
}

const Home: NextPage<HomeProps> = ({

  providers,
}) => {
  const { data: session } = useSession()

  if (!session) {
    return <Login providers={providers} />
  }

  return (
    <Feed />
    // <div>
    //   <Head>
    //     <title>Twitter</title>
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
    //     <Sidebar />
    //     <Feed />
    //     {/* Widgets */}

    //     {/* Modal */}
    //   </main>
    // </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      session,
      providers
    },
  }
}

export default Home
