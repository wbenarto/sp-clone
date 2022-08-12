import React from 'react'
import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import useUserInfo from '../hooks/useUserInfo'

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
  ];
  

function Profile({session}) {
    // const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const [userData, setUserData] = useState([])

    useEffect(()=>{
        if (spotifyApi.getAccessToken()) {
        
           setUserData(session.user)
        }
    }, [])

    const userProfile = useUserInfo()
    console.log(userProfile)

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      {/* <header className="absolute top-5 right-8">
        <div
          onClick={signOut}
          className="flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full p-1 pr-2"
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header> */}
      <section
  
        className='flex items-end justify-center space-x-7 text-white w-full h-80'
      >
  
        <div>
          <img className='h-40 w-40 flex mx-auto rounded-full' src={userData?.image}></img>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold pt-8">
          {userData?.name}
          </h1>
        </div>
      </section>
      <section 
        className='text-white h-20 flex p-5'
      >
        <div className='flex content-center text-center'>
           {/* <p>Followers: {userData.followers.total} </p>  */}
           <p className='flex '>Followers:</p>
           <p className='flex '>Following:</p>
           <p className='flex '>Member since:</p>
        </div>

      </section>

      <section 
        className='text-white h-[600px] flex'
      >
        {/* Top 5 Tracks */}
        <div className='flex-column h-64 w-1/2 '>
           {/* <p>Followers: {userData.followers.total} </p>  */}
          <div className='flex flex-row h-10 w-full items-center justify-evenly  '>
            <h1 className='flex font-bold text-xl '>Top Tracks of All Time</h1>

            <button className='flex content-center justify-center  border-white border rounded-[50px] p-2 w-[120px]'><p className='text-sm text-center'>SEE MORE</p></button>
          </div>
          <div className='flex-column bg-purple p-2'>
          {userProfile?.top_5_tracks?.items.map((e, i)=>(
            
              <p className='flex h-8'>{e.name}</p> 
         
            
          ))}
          </div>
        </div>
        
        {/* Top 5 artists */}
        <div className='flex-column h-64 w-1/2 '>
           {/* <p>Followers: {userData.followers.total} </p>  */}
          <div className='flex flex-row h-10 w-full items-center justify-evenly'>
            <h1 className='flex font-bold text-xl '>Top Artists of All Time</h1>

            <button className='flex content-center justify-center  border-white border rounded-[50px] p-2 w-[120px]'><p className='text-sm text-center'>SEE MORE</p></button>
          </div>
          <div className='flex-column bg-purple p-2'>
          {userProfile?.top_5_artists?.items.map((e, i)=>(
            
              <p className='flex h-8'>{e.name}</p> 
         
            
          ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile