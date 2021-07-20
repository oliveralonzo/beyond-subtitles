import React, { FC, useState } from 'react'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Button} from 'react-bootstrap'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'

// done following this tutorial https://www.digitalocean.com/community/tutorials/how-to-build-a-photo-search-app-with-react-using-the-unsplash-api

const gf = new GiphyFetch('jNiIz3g1ymGeDj3V0snTceqwlqVVw22L')

export const SearchBox:FC = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const searchGiphy = async(e) => {
    e.preventDefault()
    gf.search(query, { sort: 'relevant', lang: 'es', limit: 10 }).then((data) => {
      setResults(data.data)
      console.log(data)
    })
  }

  return (
    <>
    <InputGroup>
      <FormControl
        placeholder={"Search ..."}
        aria-label="/add aria-label"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outline-primary" onClick={searchGiphy}>Search</Button>
      <Button variant="outline-secondary">Upload</Button>
    </InputGroup>
    <Container className="result-list">
      {results.map((result) =>
        <div className="result" key={result.id}>
          <img
            className="result--image"
            src={result.images.original.url}
            width="100%"
            height="100%">
          </img>
            </div>)
      }
    </Container>
    </>
  )
}
