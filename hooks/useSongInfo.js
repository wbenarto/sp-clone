import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";
import { useState, useEffect } from "react";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        );
        const res = await trackInfo.json();

        setSongInfo(res);
      }
    };

    const fetchPlayerInfo = async () => {
      const playerInfo = await fetch(
        `https://api.spotify.com/v1/me/player/devices`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      );

      const playerInfoRes = await playerInfo.json();
      console.log(playerInfoRes);
    };
    fetchPlayerInfo();
    fetchSongInfo();
  }, [currentIdTrack, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
