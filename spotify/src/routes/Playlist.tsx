import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const axios = require('axios').default

const Client_ID = "30b4bfcdae0f49e58aeafb1d5fc734ab"
const Client_SECRET = "bb8bffb11b68488091898c802d27fb6e"

const MySwal = withReactContent(Swal)

export default function Playlist() {
  const [searchInput, setSearchInput] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [playlists, setPlaylists] = useState([])
  const [tracksPlaylist, setTracksPlaylist] = useState([])

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

  console.log(accessToken)

  async function playlistsSpotify(){
    //const playlist_token = "BQDqVYPeSENjR7lRXlAXEdgtRtOxH0jXeYOpN5VBMeugFFMWq1tUViLJ-juzLShy8zhhqhy3okyJ-5WyNtqsmd_krsL_mx2xUnqkbZm_F9PyOh3O56EYm-lKCyeJKxQlv2pP1bTREUgRMaUfMTkHZAU546w4HY1CcaEBpMDv9sT6CoYraZrpOreLrg"
    let playlistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer '+ playlist_token
        'Authorization': 'Bearer '+ accessToken
      }
    }
    let currentPlaylist = await fetch('https://api.spotify.com/v1/me/playlists'+'?limit=50', playlistParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPlaylists(data)
    })
    console.log(currentPlaylist)
  }

  async function addPlaylist(){
    const playlist_token = "BQBMnWkR99BHPkx5PhAbk08d8Xl7wt2gmv6qCOV3nmekaAHe1_K_QSK5UlUgQQs6CJ3w08Vk3VtVEFrMA8DuDdhUEdwruff5I74PZ6WpNkjcWdfB95HrlIj4uZ3Rkr6T43G1HEYg770sZfIJNcZu0CxwH05Mk2rFBVSL0zQf6cEfXXDnmKO03ukCabJP1vRYsxFO7Do8npWBMB1TYb-NP1KvMwWX-RFn179KAa3xFA" //token à renseigner

    let playlistParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ playlist_token
      },
      body: JSON.stringify({
        name: searchInput
      })
    }
    fetch('https://api.spotify.com/v1/users/beusam39/playlists', playlistParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))

      //console.log('Playlist créée')
      MySwal.fire({
        title: 'Playlist créée',
        icon: 'success',
        confirmButtonText: 'OK'
      })
  }

  async function addTrackPlaylist(){
    let artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accessToken
      }
    }

    let trackUri = await fetch("https://api.spotify.com/v1/search?q="+ searchInput+ '&type=track', artistParameters)
      .then(response => response.json())
      .then(data => {return data.tracks.items[0].uri})

    const playlist_token = "BQBMnWkR99BHPkx5PhAbk08d8Xl7wt2gmv6qCOV3nmekaAHe1_K_QSK5UlUgQQs6CJ3w08Vk3VtVEFrMA8DuDdhUEdwruff5I74PZ6WpNkjcWdfB95HrlIj4uZ3Rkr6T43G1HEYg770sZfIJNcZu0CxwH05Mk2rFBVSL0zQf6cEfXXDnmKO03ukCabJP1vRYsxFO7Do8npWBMB1TYb-NP1KvMwWX-RFn179KAa3xFA" //token à renseigner
    let playlistParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accessToken
      },
      body: JSON.stringify({
        uris: trackUri
      })
    }
    fetch('https://api.spotify.com/v1/playlists/7ympgQ6QtrHjgVdgT605Pp/tracks', playlistParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))

      //console.log('Ajout du morceau à la playlist')
      MySwal.fire({
        title: 'Ajout du morceau à la playlist',
        icon: 'success',
        confirmButtonText: 'OK'
      })
  }
  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Rentrez un nom de playlist ou une recherche"
            type="input"
            onKeyPress={event => {
              if(event.key == "Enter") {
                console.log("Pressed enter");
              }
            }}
            onChange={event => setSearchInput(event.target.value)}/>
            <Button onClick={playlistsSpotify}>All Playlists</Button>
            <Button onClick={addPlaylist}>Add Playlist</Button>
            <Button onClick={addTrackPlaylist}>Add Track Playlist</Button>
        </InputGroup>
      </Container>
      <Container className="card-content">
        <Row className="mx-2 row row-cols-4">
          {playlists.map((playlist, i) => {
            console.log(playlist)
            return (
              <Card>
                <Card.Img src={playlists.images[0].url}/>
                <Card.Body>
                  <a href={`playlist/${playlist.id}`}><Card.Title>{playlist.name}</Card.Title></a>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}