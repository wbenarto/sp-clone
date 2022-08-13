import { useRecoilState } from 'recoil';
import useSpotify from "./useSpotify";
import axios from 'axios'
import { useState, useEffect } from "react";

function useUserInfo() {
    const spotifyApi = useSpotify()
    const [userData, setUserData] = useState({})

    useEffect(()=> {

      const headers = {
          Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      }
      const fetchAll = () => {
        const getTracks = axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5`,{headers})
        const getArtists = axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5`, {headers})
        const getRecentlyPlayed = axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=10`, {headers})
        const getUserInfo = axios.get(`https://api.spotify.com/v1/me/`, {headers})
        const getUserFollowing = axios.get(`https://api.spotify.com/v1/me/following?type=artist`, {headers})
        axios.all([getTracks, getArtists, getRecentlyPlayed, getUserInfo, getUserFollowing]).then(
          axios.spread((...allData) => {
            console.log(allData)
            const topTracks = allData[0].data.items
            const topArtists = allData[1].data.items
            const recentlyPlayed = allData[2].data.items
            const userInfo = allData[3].data
            const userFollowing = allData[4].data.artists

            setUserData({topTracks, topArtists, recentlyPlayed, userInfo, userFollowing})
          })
        )
      }

      fetchAll() 
    }, [])
    console.log(userData)

    return userData
}

export default useUserInfo

// https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term
// Top Artist https://api.spotify.com/v1/me/top/artists
// Top Songs 
// https://api.spotify.com/v1/me/top/tracks?time_range=long_term