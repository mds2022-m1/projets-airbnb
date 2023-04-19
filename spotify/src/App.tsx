import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Client_ID = "30b4bfcdae0f49e58aeafb1d5fc734ab"
const Client_SECRET = "bb8bffb11b68488091898c802d27fb6e"

const MySwal = withReactContent(Swal)

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [albums, setAlbums] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [tracks, setTracks] = useState([])
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

  async function searchArtist() {
    console.log("Search for "+ searchInput)

    let artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accessToken
      }
    }

    let artistId = await fetch("https://api.spotify.com/v1/search?q="+ searchInput+ '&type=artist', artistParameters)
      .then(response => response.json())
      .then(data => {return data.artists.items[0].id})

    console.log("Artiste ID is "+ artistId)

    let returnAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&market=FR&limit=50', artistParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbums(data.items)
    });
  }

  async function searchTrack() {
    console.log("Search for "+ searchInput)

    let artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accessToken
      }
    }

    let trackId = await fetch("https://api.spotify.com/v1/search?q="+ searchInput+ '&type=track', artistParameters)
      .then(response => response.json())
      .then(data => {return data.tracks.items[0].id})

    console.log("Track ID is "+ trackId)

    let returnTracks = await fetch('https://api.spotify.com/v1/tracks/' + trackId, artistParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTracks(data.items)
    });
    console.log(returnTracks)
  }

  async function playlistsSpotify(){
    //const playlist_token = "BQBMnWkR99BHPkx5PhAbk08d8Xl7wt2gmv6qCOV3nmekaAHe1_K_QSK5UlUgQQs6CJ3w08Vk3VtVEFrMA8DuDdhUEdwruff5I74PZ6WpNkjcWdfB95HrlIj4uZ3Rkr6T43G1HEYg770sZfIJNcZu0CxwH05Mk2rFBVSL0zQf6cEfXXDnmKO03ukCabJP1vRYsxFO7Do8npWBMB1TYb-NP1KvMwWX-RFn179KAa3xFA"
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
        setPlaylists(data.items)
    })
    console.log(currentPlaylist)
  }
  async function trackPlaylistSpotify(){
    //const playlist_token = "BQCQ9-Bi2_bvRSzG1Riu80zzvDDmJD-y9neKRPINewk94XPfnKiMq0qy4axOBCxJz2pLiE50j5yzJ_KT3VjRqaFTDwuSOEqOs3UOU-gnO3uk2GlP-rsvh-sPeHcE0MLYYYV8LawZOnmAjWRaA8CpsIXj6mfaoE3IzFCS7FoHwe1Vi4yrtul6GiKCcFE3Ac2_yn15bY5aihfuCPUiP28TXkECWo5HReOOG-m27vwxTQ"
    let playlistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer '+ playlist_token
        'Authorization': 'Bearer '+ accessToken
      }
    }
    let itemsPlaylist = await fetch('https://api.spotify.com/v1/playlists/'+searchInput+'/tracks', playlistParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTracksPlaylist(data.items)
    })
    console.log(itemsPlaylist)
  }

  async function addPlaylist(){
    //const playlist_token = "BQBMnWkR99BHPkx5PhAbk08d8Xl7wt2gmv6qCOV3nmekaAHe1_K_QSK5UlUgQQs6CJ3w08Vk3VtVEFrMA8DuDdhUEdwruff5I74PZ6WpNkjcWdfB95HrlIj4uZ3Rkr6T43G1HEYg770sZfIJNcZu0CxwH05Mk2rFBVSL0zQf6cEfXXDnmKO03ukCabJP1vRYsxFO7Do8npWBMB1TYb-NP1KvMwWX-RFn179KAa3xFA" //token à renseigner

    let playlistParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer '+ playlist_token
        'Authorization': 'Bearer '+ accessToken
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

    //const playlist_token = "BQBMnWkR99BHPkx5PhAbk08d8Xl7wt2gmv6qCOV3nmekaAHe1_K_QSK5UlUgQQs6CJ3w08Vk3VtVEFrMA8DuDdhUEdwruff5I74PZ6WpNkjcWdfB95HrlIj4uZ3Rkr6T43G1HEYg770sZfIJNcZu0CxwH05Mk2rFBVSL0zQf6cEfXXDnmKO03ukCabJP1vRYsxFO7Do8npWBMB1TYb-NP1KvMwWX-RFn179KAa3xFA" //token à renseigner
    let playlistParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer '+ playlist_token
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
            placeholder="Recherche d'un artiste"
            type="input"
            onKeyPress={event => {
              if(event.key == "Enter") {
                console.log("Pressed enter");
              }
            }}
            onChange={event => setSearchInput(event.target.value)}/>
            <Button onClick={searchArtist}> Search Artist</Button>
            <Button onClick={searchTrack}> Search Track</Button>
            <Button onClick={playlistsSpotify}>All Playlists</Button>
            <Button onClick={trackPlaylistSpotify}>Tracks of Playlist</Button>
            <Button onClick={addPlaylist}>Add Playlist</Button>
            <Button onClick={addTrackPlaylist}>Add Track Playlist</Button>
        </InputGroup>
      </Container>
      <Container className='card-content'>
        <Row className="mx-2 row row-cols-4">
          {albums.map((album, i) => {
            console.log(album)
            return (
              <Card>
                <Card.Img src={album.images[0].url}/>
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>
      <Container className="card-content">
        <Row className="mx-2 row row-cols-4">
          {playlists.map((playlist, i) => {
            console.log(playlist)
            return (
              <Card>
                <Card.Img src={playlist.images[0].url}/>
                <Card.Body>
                  <Card.Title>{playlist.name}</Card.Title>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>
      <Container className="card-content">
        <Row className="mx-2 row row-cols-4">
          {tracksPlaylist.map((track, i) => {
            console.log(track)
            return (
              <ul>
                <li>{track.track.name}</li>
              </ul>
            )
          })}
        </Row>
      </Container>
      <Container className="card-content">
        <Row className="mx-2 row row-cols-4">
          {tracks.map((track, i) => {
            console.log(track)
            return (
              <ul>
                <li>{track.name}</li>
              </ul>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default App