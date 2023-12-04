import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "../../../lib/mongo"
import User from "/app/(models)/User";

export const options = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    FacebookProvider({
      profile(profile) {
        console.log("Profile FaceBook: ", profile);

        return profile
      },
      clientId: "318698361046134",
      clientSecret: "4b31c05b8c44b18458e4a83c2f539487",
    }),
    GoogleProvider({
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
        };

      },
      clientId: "1020201000495-pabs2b6gk4743a3sg89o8d65js9cqq3t.apps.googleusercontent.com",
      clientSecret: "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",
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile, email, isNewUser }) {
      let isUser = await User.findOne({ email: profile.email, isComplete: true })
      // console.log({ user, account, profile, email, credentials })
      if (!isUser) {
        // return { user, account, profile, email, credentials }
        return `/dashboard`

      } else {
        return `/setup?email=${profile.email}`
        // Or you can return a URL to redirect 
      }
    },
    async jwt({ token, user }) {
      // if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      // if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/setup' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};
