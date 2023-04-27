import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { AuthService } from '@SRC/services';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: {
          label: 'Username',
          type: 'text',
          placeholder: 'jsmith'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const { userName, password } = credentials as any;
        const user = await AuthService.login(userName, password);

        return user ? user : null;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    }
  },

  pages: {
    signIn: '/account/signin'
  }
};

export default NextAuth(authOptions);
