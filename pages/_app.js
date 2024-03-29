import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Layout from '../components/Layout'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(session);
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Layout session={session} >
          <Component session={session} {...pageProps} />
        </Layout>
       
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
