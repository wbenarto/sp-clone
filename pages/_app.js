import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(session);
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component session={session} {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
