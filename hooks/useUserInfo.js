import { useRecoilState } from 'recoil';
import useSpotify from "./useSpotify";
import { useState, useEffect } from "react";

function useUserInfo() {
    const spotifyApi = useSpotify()
    const [userData, setUserData] = useState([])

    useEffect(()=> {
        const fetchUserInfo = async () => {
            const userInfo = await fetch(`https://api.spotify.com/v1/me/`, {
                headers: {
                  Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                },
              })
              
            const res = await userInfo.json()

            setUserData(res)
        }

        fetchUserInfo()
        
    }, [])

    return userData
}

export default useUserInfo

// https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term
// Top Artist https://api.spotify.com/v1/me/top/artists
// Top Songs 
// https://api.spotify.com/v1/me/top/tracks?time_range=long_term