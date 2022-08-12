import Center from "../components/Center";
import { getSession } from "next-auth/react";

export default function Home(props) {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Center />
      </main>

      {/* <div className="sticky bottom-0">
        <Player accessToken={props.session.user.accessToken} />
      </div> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
