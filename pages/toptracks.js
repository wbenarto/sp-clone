import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Profile from "../components/Profile";
import { getSession } from "next-auth/react";

export default function Home(props) {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
      </main>

 
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
