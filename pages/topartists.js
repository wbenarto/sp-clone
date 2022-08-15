
import { getSession } from "next-auth/react";

export default function Home({session, data}) {

  console.log(session, data)
  const topArtistsData = data.items
  return (
    
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <section
  
  className='flex items-end justify-center space-x-7 p-10 text-white  h-40'
 >
   <h1 className='font-bold text-xl'>Top 50 Artists of All Time</h1>
 
 </section>
 <section  className='flex-column items-end justify-center  bg-black text-white w-full '>
   {topArtistsData ? topArtistsData.map((e,i) => (
    <div className='flex flex-row justify-center  w-full items-center my-5 h-20'>
    <p className='w-10 text-center'>{i+1}</p>
    <img alt='test image' className='h-20 w-20 mx-5 ' src={e.images[0]?.url}></img>
    <div className='w-[50%] h-20 '>
      <h1>{e.name}</h1>
      <p>{e.genres.map((e,i)=> e).join(', ')}</p>
      <p>followers: {e.followers.total}</p>
    </div>
  </div>
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

  const data = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50', {
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
