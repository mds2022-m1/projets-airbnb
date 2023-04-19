import { useEffect, useState } from "react"
import { Card, Container, Row } from "react-bootstrap"
import { useLocation, useParams } from "react-router"

const Client_ID = "30b4bfcdae0f49e58aeafb1d5fc734ab"
const Client_SECRET = "bb8bffb11b68488091898c802d27fb6e"

export default function Album() {

    //generate function to recover id from url
    const [album, setAlbum] = useState([])
    const [images, setImages] = useState([])
    const [accessToken, setAccessToken] = useState("")
    useEffect(() => {
        let authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id='+ Client_ID + '&client_secret='+ Client_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

        /*const search = useLocation().search;
        const idAlbum = new URLSearchParams(search).get('id');
        /*const params = new URLSearchParams(url.split("?")[1])
        const albumId = params.get("albumId")*/
        const params = useParams();
        const albumId = params.id;

        console.log(params); // 👉️ {userId: '4200'}
        //const playlist_token = "BQC4k4HuQAYnchllT27EnvZkq4gQuqlXd69OScy7e-oWDZAlP53MvbCfoo5oyirOdYCRBdtiJe6N0dnzaiTufzA5ovCV16VZxX3xf3u2Dn1eBFv4dSCtjVzoaHeiU4paUi9WD6b10wwsrsbaKpVRq0I2XzCBrdfP8-ZUOYGTOgHZ" //token à renseigner
        /*let playlistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer '+ playlist_token
                'Authorization': 'Bearer '+ accessToken
            }
        }
        let currentAlbum = fetch('https://api.spotify.com/v1/albums/'+albumId, playlistParameters)
            .then(response => response.json())
            .then(data => {
                setAlbum(data)
                console.log(data)
        })*/
        
        const fetchImagesAlbum = () => {
            let playlistParameters = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ accessToken
              }
            };
          
            fetch('https://api.spotify.com/v1/albums/'+albumId, playlistParameters)
              .then(response => response.json())
              .then(data => {
                setImages(data.images)
                console.log(data)
              })
        }
          
          useEffect(() => {
            fetchImagesAlbum();
          }, []);

          const fetchAlbum = () => {
            let playlistParameters = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ accessToken
              }
            };
          
            fetch('https://api.spotify.com/v1/albums/'+albumId, playlistParameters)
              .then(response => response.json())
              .then(data => {
                setAlbum(data)
                console.log(data)
              })
          }
          
          useEffect(() => {
            fetchAlbum();
          }, []);

    return (
        <div>
            <h1>Album</h1>
            <h2>userId is 👉️ {params.id}</h2>
            {images.map((infAlbum, i) => {
                    console.log(album)
                    return (
                        <img src={images[0].url} alt="album cover" />
                    )
            })}
            <h3>{album.name}</h3>
            <h4>{album.total_tracks}</h4>
        </div>
    );
}