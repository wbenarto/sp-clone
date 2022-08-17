
import { getSession } from "next-auth/react";
import Link from'next/link'

export default function Home({session, data}) {

  // console.log(session, data)
  const topTracksData = data.items
  return (
    
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <section
  
  className='flex items-end justify-center space-x-7 p-10 text-white  h-40'
 >
   <h1 className='font-bold text-xl'>Top 50 Tracks of All Time</h1>
 
 </section>
 <section  className='flex-column items-end justify-center  bg-black text-white w-full '>
   {topTracksData ? topTracksData.map((e,i) => (
    <Link href={`/tracks/${e.id}`}>

    <div className='flex flex-row cursor-pointer justify-center  w-full items-center my-5 h-20'>
      <p className='w-10 text-center'>{i+1}</p>
      <img alt='test image' className='h-20 w-20 mx-5 ' src={e.album?.images[0].url}></img>
      <div className='w-[50%] h-20 '>
        <h1>{e.name}</h1>
        <p>{e.artists.map((e,i)=> e.name)}</p>
        <p>{e.album.name}</p>
      </div>
    </div>
    </Link>
    
   ))
  : <></>}
   
  </section>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const data = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`
    }
  })
  const res = await data.json()


  return {
    props: {
      data: res,
      session,
    },
  };
}
