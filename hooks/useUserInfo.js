import { useRecoilState } from 'recoil';
import useSpotify from "./useSpotify";
import axios from 'axios'
import { useState, useEffect } from "react";

function useUserInfo() {
    const spotifyApi = useSpotify()
    const [userData, setUserData] = useState({})
    const [topFiveTracks, setTopFiveTracks] = useState({})

    // fetch 5 apis
    // followers
    // following
    // top 5 tracks all time
    // top 5 artists all time
    // 5 recently played tracks


    useEffect(()=> {

      // const fetchTopTracks = async () =>{
      //   const data = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5`, 
      //   {
      //     headers: {
      //       Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      //     },
      //   })

      //   const res = await data.json()
      //   setUserData({...userData, "top_5_tracks" : res})
      // }

      // const fetchTopArtists = async () =>{
      //   const data = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5`, 
      //   {
      //     headers: {
      //       Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      //     },
      //   })

      //   const res = await data.json()
      //   setUserData({...userData, "top_5_artists" : res})
      // }

      // const fetchRecentlyPlayed = async () =>{
      //   const data = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=10`, 
      //   {
      //     headers: {
      //       Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      //     },
      //   })

      //   const res = await data.json()
      //   setUserData({...userData, "recently_played" : res})
      // }
      
      // const fetchAll = async () => {
      //   Promise.all([fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5`,  {
      //     headers: {
      //       Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      //     },
      //   }),
      //   fetch(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5`,  {
      //     headers: {
      //       Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      //     },
      //   }), 
      //   fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=10`,  {
      //     headers: {
      //       Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      //     },
      //   }), 
      // ]).then(([topTracks, topArtists, recentlyPlayed]) => {
      //   console.log(topTracks.json)
      //   setUserData({topTracks,topArtists, recentlyPlayed})
      // }).catch((err) => {console.log(err)})
      // }
      const headers = {
          Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      }
      const fetchAll = () => {
        const getTracks = axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5`,{headers})
        const getArtists = axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5`, {headers})
        const getRecentlyPlayed = axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=10`, {headers})
        axios.all([getTracks, getArtists, getRecentlyPlayed]).then(
          axios.spread((...allData) => {
            const topTracks = allData[0].data.items
            const topArtists = allData[1].data.items
            const recentlyPlayed = allData[2].data.items

            setUserData({topTracks, topArtists, recentlyPlayed})
          })
        )
      }


      fetchAll()

      
      // fetchTopTracks()
      // fetchTopArtists()
      // fetchRecentlyPlayed()
    }, [])
    

    return userData
}

export default useUserInfo

// https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term
// Top Artist https://api.spotify.com/v1/me/top/artists
// Top Songs 
// https://api.spotify.com/v1/me/top/tracks?time_range=long_term