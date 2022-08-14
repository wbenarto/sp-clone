import React from 'react'
import { useRecoilState } from 'recoil';
import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import useUserInfo from '../hooks/useUserInfo'
import { playlistState } from '../atoms/playlistAtom';
import { topTracksState } from '../atoms/topTracksAtom';

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
    const [currentTrackIdState, setCurrentTrackIdState] = useRecoilState(playlistState)
    const [topTracks, setTopTracks] = useRecoilState(topTracksState)
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const [userData, setUserData] = useState([])
    // const [userProfile, setUserProfile] = useState({})

    useEffect(()=>{
     
        if (spotifyApi.getAccessToken()) {
        
           setUserData(session.user)
           
        }
        
    }, [])
    const userProfile = useUserInfo()
    console.log(userProfile, currentTrackIdState)

    setTopTracks(userProfile.topTracks)


    console.log('top tracks atom', topTracks)
 
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
        className=' text-white h-24 flex p-5'
      >
        <div className='flex justify-center w-full '>
           {/* <p>Followers: {userData.followers.total} </p>  */}
           <div className='flex-column text-center justify-center  w-24 h-18'>
           <p className='text-[#2ed930]'>{userProfile?.userInfo?.followers.total}</p>
           <p>Followers</p>
           </div>
           <div className='flex-column text-center justify-center w-24 h-18'>
           <p className='text-[#2ed930]'>{userProfile?.userFollowing?.total}</p>
           <p>Following</p>
           </div>
           
          
    
        </div>

      </section>

      <section 
        className='text-white h-[600px] flex'
      >
        {/* Top 5 Tracks */}
        <div className='flex-column h-64 w-1/2  px-2'>
           {/* <p>Followers: {userData.followers.total} </p>  */}
          <div className='flex flex-row h-10 w-full items-center justify-between  '>
            <h1 className='flex font-bold text-xl '>Top Tracks of All Time</h1>

            <button className='flex content-center justify-center  border-white border rounded-[50px] p-2 w-[120px]'><p className='text-sm text-center'>SEE MORE</p></button>
          </div>
          <div className='flex-column bg-purple p-2'>
          {userProfile?.topTracks?.map((e, i)=>(

            <div className='flex flex-row h-20 my-5'>
              <img className='flex h-20 w-20' src={e.album.images[0]?.url}></img>
              <h1 className='flex h-8 pl-5 self-center'>{i+1}. {e.name}</h1> 
            </div>

))}
          </div>
        </div>
        
        {/* Top 5 artists */}
        <div className='flex-column h-64 w-1/2 px-2'>
           {/* <p>Followers: {userData.followers.total} </p>  */}
          <div className='flex flex-row h-10 w-full items-center justify-between'>
            <h1 className='flex font-bold text-xl '>Top Artists of All Time</h1>

            <button className='flex content-center justify-center  border-white border rounded-[50px] p-2 w-[120px]'><p className='text-sm text-center'>SEE MORE</p></button>
          </div>
          <div className='flex-column bg-purple p-2'>
          {userProfile?.topArtists?.map((e, i)=>(

              <div className='flex flex-row h-20 my-5'>
                <img className='flex h-20 w-20' src={e.images[0]?.url}></img>
                <h1 className='flex h-8 pl-5 self-center'>{i+1}. {e.name}</h1> 
              </div>
            
          ))}
          </div>
        </div>
      </section>
    </div>
  )
}


export default Profile