import { getSession } from 'next-auth/react'
import React from 'react'

function TrackDetails({session, res, res2, res3}) {
  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
  ];

  console.log(res, res2, res3)
  return (
    <div  className="bg-black h-screen overflow-hidden">
      <main className='flex-column'>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-pink-500 h-80 text-white p-8 w-full`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={res3?.album.images[0].url}
          alt=""
        />
        <div>
          <p>{res3.artists.map((e,i) => e.name).join(', ')}</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {res3.name}
          </h1>
        </div>
      </section>
        <div className=' items-center  '>
          <div className='grid grid-cols-5 gap-4 items-center px-5 text-white'>
            <div className='flex-column justify-center text-center  items-center py-5 w-24 h-24 border border-white'>
              <p className=' text-xl h-1/2'>{Math.floor(res.track.tempo)} Bpm</p>
              <p className='h-1/2  '>Tempo</p>
            </div>
            <div className='flex-column justify-center text-center items-center py-5 w-24 h-24 border border-white'>
              <p className=' text-xl'>{res.track.time_signature}</p>
              <p className=''>Signature</p>
            </div>
            <div className='flex-column justify-center text-center items-center py-5 w-24 h-24 border border-white'>
              <p className=' text-xl'>{res2.valence}</p>
              <p className=''>Valence</p>
            </div>
            <div className='flex-column justify-center text-center items-center py-5 w-24 h-24 border border-white'>
              <p className=' text-xl'>{res2.energy}</p>
              <p className=''>Energy</p>
            </div>
            <div className='flex-column justify-center text-center items-center py-5 w-24 h-24 border border-white'>
              <p className=' text-xl'>{res2.danceability}</p>
              <p className=''>Danceability</p>
            </div>
            <div className='flex-column justify-center text-center items-center py-5 w-24 h-24 border border-white'>
              <p className='text-xl'>{Math.floor(res.track.tempo)} Bpm</p>
              <p className=''>Tempo</p>
            </div>
            <div className='flex-column justify-center text-center items-center py-5 w-24 h-24 border border-white'>
              <p className=' text-xl'>{Math.ceil(res.track.duration/60)}:{Math.floor(res.track.duration%60)}</p>
              <p className=''>Duration</p>
            </div>
            
          </div>
        </div>

       
        <p>time signature: {res.track.time_signature}</p>
        <p>popularity:</p>
        <p>valence:{res2.valence}</p>
        <p>liveness:</p>
        <p>energy: {res2.energy}</p>
        <p>danceability: {res2.danceability}</p>
        <p>duration: {Math.ceil(res.track.duration/60)}:{res.track.duration%60}</p>
      </main>
    </div>
  )
}

export default TrackDetails

export async function getServerSideProps(context) {
    const session = await getSession(context)
    console.log(context.params)

    const data = await fetch(`https://api.spotify.com/v1/audio-analysis/${context.params.id}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`
      }
    })
    const res = await data.json()

    const data2 = await fetch(`https://api.spotify.com/v1/audio-features/${context.params.id}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`
      }
    })
    
    const data3 = await fetch(`https://api.spotify.com/v1/tracks/${context.params.id}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`
      }
    })
    const res2 = await data2.json()
    const res3 = await data3.json()
    console.log(res)
    return {
        props: {
            session,
            res,
            res2,
            res3
        }
    }
}