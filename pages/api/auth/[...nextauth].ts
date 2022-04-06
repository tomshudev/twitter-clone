import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'

export interface TwitterSession extends Session {
  user: {
    name?: string
    tag?: string
    uid: string | undefined,
    image: string
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<TwitterSession> {
      const newSession: TwitterSession = { ...session } as TwitterSession
      if (!newSession || !newSession.user) return newSession
      newSession.user.tag = newSession.user.name
        ?.split(' ')
        .join('')
        .toLocaleLowerCase()

      newSession.user.uid = token.sub

      return newSession
    },
  },
})
