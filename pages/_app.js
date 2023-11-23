import "@/styles/globals.css";
// import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
