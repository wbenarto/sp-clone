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
  

function Profile() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const [userData, setUserData] = useState([])

    const userInfo = useUserInfo()
    

    useEffect(()=>{
        if (spotifyApi.getAccessToken()) {
        
           setUserData(userInfo)
        }
    }, [])

    console.log(userData)

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
        // className={`flex items-end space-x-7 bg-gradient-to-b to-black h-80 text-white p-8 w-full`}
        className='flex items-end justify-center space-x-7 text-white w-full h-80'
      >
  
        <div>
          <img className='h-40 w-40 flex mx-auto rounded-full' src={userData.images[0].url}></img>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold pt-8">
          {userData.display_name}
          </h1>
        </div>
      </section>
      <section 
        className='text-white'
      >
        <div>
           <p>Followers: {userData.followers.total} </p> 
           
        </div>

      </section>
    </div>
  )
}

export default Profile