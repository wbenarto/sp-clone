import {
  HomeIcon,
  MusicNoteIcon,
  MicrophoneIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Link from 'next/link'

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log("you picked playlist ", playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {

      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }

    console.log(playlistId);
  }, [session, spotifyApi]);

  // console.log(playlists);

  return (
    <div className="text-gray-500 p-5 text-sm lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[10rem] lg:max-w-[10rem] hidden md:inline-flex">
      <div className="space-y-10">
        <Link href='/'>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        </Link>
        
        <Link href='/profile'>
        <button className="flex items-center space-x-2  hover:text-white">
          <UserCircleIcon className="h-5 w-5" />
          <p>Profile</p>
        </button>
        </Link>
        
        <Link href='/topartists'>
        <button className="flex items-center space-x-2  hover:text-white ">
          <MusicNoteIcon className="h-5 w-5" />
          <p>Top Artists</p>
        </button>
        </Link>
        
        <Link href='/toptracks'>
        <button className="flex items-center space-x-2 hover:text-white">
          <MicrophoneIcon className="h-5 w-5" />
          <p>Top Tracks</p>
        </button>

        </Link>
       
        <button onClick={signOut} className="flex items-center space-x-2 text-red-800 hover:text-white">
          <LogoutIcon className="h-5 w-5" />
          <p>LogOut</p>
        </button>
        
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlists.map((playlist) => (
          <Link href='/'>
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id) }
            className="cursor-pointer space-y-4 hover:text-white"
          >
            {playlist.name}
          </p>
          </Link>
          
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
