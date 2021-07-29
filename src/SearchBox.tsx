import React, { FC, useState, useEffect } from 'react'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Button, Nav} from 'react-bootstrap'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import Gallery from 'react-grid-gallery'
import SearchFor from './Enums'

// done following this tutorial https://www.digitalocean.com/community/tutorials/how-to-build-a-photo-search-app-with-react-using-the-unsplash-api

const ResultsTab:FC = (props) => {
  const gf = new GiphyFetch('jNiIz3g1ymGeDj3V0snTceqwlqVVw22L')
  const [results, setResults] = useState([])

  const onSelectImage = (index, image) => {
     var updated_results = results.slice()
     var curr = updated_results[index]
     console.log(curr)
     if(curr.hasOwnProperty("isSelected"))
       curr.isSelected = !curr.isSelected
     else
       curr.isSelected = true
     setResults(updated_results);

     const visuals = results.filter((curr) => {
       console.log(curr)
       return curr.isSelected
     })
     console.log(visuals)
   }

   useEffect(() => {
     if (props.search) {
       console.log("Searching for: ", props.query, props.type)
       const doSearch = () => gf.search(props.query, { sort: 'relevant', lang: 'es', limit: 30, type: props.type }).then(data => data.data)
       let searching = true

       doSearch().then(
         data => {
           if (searching) {
           setResults(() => {
             return data.map((result) => {
               return {
                 src: result.images.original.url,
                 thumbnail: result.images.original.url,
                 thumbnailWidth: result.images.original.width,
                 thumbnailHeight: result.images.original.height
                }
              })
             })
           }
         }
       )
       props.onSearch(props.index)
     } else if (props.query == "") {
       setResults([])
     }

     return function cleanup() {
       searching = false
     }
   }, [props.search, props.query])

  return (
    <Tab.Pane eventKey={props.search_for}>
      <Container className="result-list">
        <Gallery onSelectImage={onSelectImage} images={results} margin={5} enableImageSelection={true}/>
      </Container>
    </Tab.Pane>
  )
}

export const SearchBox:FC = () => {
  const empty_tabs = [
    {
      "type": "gifs",
      "search_for": "GIFs",
      "searched": true,
      "active": true,
      "query": ""
    },
    {
      "type": "stickers",
      "search_for": "Stickers",
      "searched": true,
      "active": false,
      "query": ""
    },
    {
      "type": "stickers",
      "search_for": "Emojis",
      "searched": true,
      "active": false,
      "query": ""
    },
  ]

  const [query, setQuery] = useState("")
  const [results, setResults] = useState({})
  const [tabs, setTabs] = useState(empty_tabs)
  const [activeTab, setActiveTab] = useState(tabs[0].search_for)

  const clear = () => {
    setQuery("")
    setResults({})
    setTabs(empty_tabs)
    setActiveTab(tabs[0].search_for)
  }

  const newSearch = () => {
    setTabs(() => {
      return tabs.map((tab) => {
        tab.searched = false
        if (tab.search_for == "Emojis" && query != "")
          tab.query = query + " " + "emojis"
        else
          tab.query = query
        console.log(tab)
        return tab
        })
      })
    }

  const searchTab = (curr_tab) => {
    setActiveTab(curr_tab)
    setTabs(() => {
      return tabs.map((tab, index) => {
        if (tab.search_for == curr_tab) {
          tab.active = true
        } else {
          tab.active = false
        }
        return tab
      })
    })
  }

  const markTabAsSearched = (index) => {
    tabs[index].searched = true
    setTabs(tabs)
  }

  return (
    <>
    <InputGroup>
      <FormControl
        placeholder={"Search..."}
        aria-label="/add aria-label"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outline-primary" onClick={newSearch}>Search</Button>
      <Button variant="outline-secondary" onClick={clear}>Clear</Button>
    </InputGroup>
    <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={searchTab}>
      <Nav variant="tabs"  className="results-tabs-nav">
        {tabs.map((tab, index) => (<Nav.Item key={index}> <Nav.Link eventKey={tab.search_for}>{tab.search_for}</Nav.Link> </Nav.Item>))}
      </Nav>
      <Tab.Content>
        {tabs.map((tab, index) => (<ResultsTab search={tab.active && !tab.searched} query={tab.query} search_for={tab.search_for} type={tab.type} onSearch={markTabAsSearched} index={index} key={index}/>))}
      </Tab.Content>
    </Tab.Container>
    </>
  )
}
