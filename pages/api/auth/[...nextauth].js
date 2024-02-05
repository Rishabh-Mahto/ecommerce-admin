import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const adminEmail = ["itsrishabh13@gmail.com", "readonrent.in@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          await mongooseConnect();
          const foundUser = await User.findOne({ email: profile.email });

          if (foundUser) {
            if (adminEmail.includes(foundUser.email)) {
              foundUser.isAdmin = true;
              await foundUser.save();
            } else {
              throw new Error("Not an admin");
            }
          } else {
            if (!adminEmail.includes(profile.email)) {
              throw new Error("Not an admin");
            }
          }
        } catch (error) {
          console.error("Error during signIn callback:", error);
          throw new Error("Error during sign in");
        }
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_TOKEN,
};

export default NextAuth(authOptions);

// Helper function for authentication checks
export async function isAdminRequest(context) {
  const session = await getSession(context);

  if (!session?.user?.email || !adminEmail.includes(session.user.email)) {
    return false;
  }

  return true;
}
