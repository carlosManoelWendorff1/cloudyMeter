import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react"; // apenas no client

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch("http://localhost:8080/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const refreshed = await res.json();

    if (!res.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.accessToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1h
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const res = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();
        if (!res.ok || !user.accessToken) return null;
        console.log("Authorize - User:", user);
        return {
          name: credentials?.name,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1h
        };
      }

      // Se o accessToken ainda não expirou
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Tenta refresh
      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user = { name: token.name } as any;
      session.accessToken = token.accessToken as string;
      session.error = token.error as string | undefined;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
