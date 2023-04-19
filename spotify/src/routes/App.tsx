import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap'
import Header from '../component/Header'
import Footer from '../component/Footer'

export default function App() {
  
  return (
    <div className="App">
      <Header />
      <Container>
        <InputGroup className="mb-3" size="lg">
            <a href={`/search`}><Button> Search Artist</Button></a><br/>
            <a href={`/playlist`}><Button> Playlist</Button></a>
        </InputGroup>
      </Container>
      <Footer />
    </div>
  )
}