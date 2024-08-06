// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User, { IUser } from '@/models/user';  // Import IUser correctly
import dbConnect from '@/utils/database';

// Extend the NextAuth Session interface to include the custom id property
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface Profile {
    picture?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        await dbConnect();

        const sessionUser = await User.findOne({ email: session.user.email }) as IUser | null;

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        await dbConnect();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists && profile?.email && profile?.name && profile?.picture) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error("Error checking if user exists: ", (error as Error).message);
        return false;
      }
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
