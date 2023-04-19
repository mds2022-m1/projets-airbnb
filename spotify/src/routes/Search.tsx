import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap'
import withReactContent from 'sweetalert2-react-content'
import { Route, Routes } from 'react-router'
import Album from '../component/Album'

const Client_ID = "30b4bfcdae0f49e58aeafb1d5fc734ab"
const Client_SECRET = "bb8bffb11b68488091898c802d27fb6e"

function Search() {
  const [searchInput, setSearchInput] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [albums, setAlbums] = useState([])
  const [tracks, setTracks] = useState([])

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
  <Routes>
    <Route path="/:id" element={<Album />} />
  </Routes>
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
                  <a href={`search/${album.id}`}><Card.Title>{album.name}</Card.Title></a>
                </Card.Body>
              </Card>
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

export default Search