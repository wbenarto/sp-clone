import {
  HomeIcon,
  SearchIcon,
  MusicNoteIcon,
  MicrophoneIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  ViewListIcon
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Link from 'next/link'
import {useRouter} from 'next/router'

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log("you picked playlist ", playlistId);

  const query= useRouter()
  console.log(query.pathname)
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
        
        <Link href='/playlists'>
        <button className="flex items-center space-x-2  hover:text-white">
          <ViewListIcon className="h-5 w-5" />
          <p>Playlists</p>
        </button>
        </Link>
        
        <button className="flex items-center space-x-2  hover:text-white ">
          <MusicNoteIcon className="h-5 w-5" />
          <p>Top Artists</p>
        </button>
    
        <button className="flex items-center space-x-2 hover:text-white">
          <MicrophoneIcon className="h-5 w-5" />
          <p>Top Tracks</p>
        </button>

        <button onClick={signOut} className="flex items-center space-x-2 text-red-800 hover:text-white">
          <MicrophoneIcon className="h-5 w-5" />
          <p>LogOut</p>
        </button>
        
        <hr className="border-t-[0.1px] border-gray-900" />

        {query.pathname !== '/playlists' ? <></> : playlists.map((playlist) => (
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
