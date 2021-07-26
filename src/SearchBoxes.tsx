import React, { FC, useState } from 'react'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Button} from 'react-bootstrap'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import Gallery from 'react-grid-gallery'
import SearchFor from './Enums'

// done following this tutorial https://www.digitalocean.com/community/tutorials/how-to-build-a-photo-search-app-with-react-using-the-unsplash-api

const gf = new GiphyFetch('jNiIz3g1ymGeDj3V0snTceqwlqVVw22L')

const SearchBox:FC = (props) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const searchGiphy = async(e) => {
    e.preventDefault()
    console.log(query + " " + props.query_parameter)
    gf.search(query + " " + props.query_parameter, { sort: 'relevant', lang: 'es', limit: 30, type: props.type }).then((data) => {
      setResults(() => {
        return data.data.map((result) => {
          return {
            src: result.images.original.url,
            thumbnail: result.images.original.url,
            thumbnailWidth: result.images.original.width,
            thumbnailHeight: result.images.original.height}
        })
      })
    })
  }

  const clear = () => {
    setQuery("")
    setResults([])
  }

  return (
    <>
    <InputGroup>
      <FormControl
        placeholder={"Search for " + props.search_for +"..."}
        aria-label="/add aria-label"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outline-primary" onClick={searchGiphy}>Search</Button>
      <Button variant="outline-secondary" onClick={clear}>Clear</Button>
    </InputGroup>
    <Container className="result-list">
      <Gallery images={results} margin={5} enableImageSelection={true}/>
    </Container>
    </>
  )
}

export const SearchBoxes:FC = () => {

  return (
  <>
  <Tabs defaultActiveKey="gifs" className="mb-3">
    <Tab eventKey="gifs" title="GIFs">
      <SearchBox search_for="gifs" type="gifs" query_parameter=""/>
    </Tab>
    <Tab eventKey="stickers" title="Stickers">
      <SearchBox search_for="stickers" type="stickers" query_parameter=""/>
    </Tab>
    <Tab eventKey="emojis" title="Emojis">
      <SearchBox search_for="emojis" type="stickers" query_parameter="emoji"/>
    </Tab>
  </Tabs>
  </>
)
}
