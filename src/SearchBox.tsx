import React, { FC, useState, useEffect } from 'react'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Button, Nav, Modal } from 'react-bootstrap'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import Gallery from 'react-grid-gallery'

// This module was built following this tutorial:
// https://www.digitalocean.com/community/tutorials/how-to-build-a-photo-search-app-with-react-using-the-unsplash-api

export const SearchBox:FC = (props) => {
  // Object holding the API for fetching results from GIPHY
  const gf = new GiphyFetch('jNiIz3g1ymGeDj3V0snTceqwlqVVw22L')

  // Default state for the 3 results tabs (GIFS, Stickers and Emojis)
  const empty_tabs = [
    {
      "type": "gifs",
      "search_for": "GIFs",
      "searched": true,
      "results": [],
      "query": "",
      "selected": []
    },
    {
      "type": "stickers",
      "search_for": "Stickers",
      "searched": true,
      "results": [],
      "query": "",
      "selected": []
    },
    {
      "type": "stickers",
      "search_for": "Emojis",
      "searched": true,
      "results": [],
      "query": "",
      "selected": []
    },
  ]

  // This state holds the query that will be sent to the GIPHY API
  const [query, setQuery] = useState("")

  // This state holds the different tabs for the results
  const [tabs, setTabs] = useState(empty_tabs)

  // This state holds which tab (from tabs) is currently selected in the interface
  const [activeTab, setActiveTab] = useState(0)

  // Helper function to clear the query and results tabs
  const clear = () => {
    setQuery("")
    setTabs(empty_tabs)
  }

  // This function searches for the type of search of the tab at index in tabs
  // and updates the tab to display the results, and marks it as searched
  const searchGiphy = (index) => {
    const tab = tabs[index]
    const doSearch = () => gf.search(tab.query, { sort: 'relevant', lang: 'es', limit: 100, type: tab.type }).then(data => data.data)

    doSearch().then(
      data => {
        const results = data.map((result) => {
         return {
           src: result.images.original.url,
           thumbnail: result.images.original.url,
           thumbnailWidth: result.images.original.width,
           thumbnailHeight: result.images.original.height,
           original_still: result.images.original_still.url
          }
        })
        if (results.length > 0)
          tab.results = results
        else
          tab.results = null
        tab.searched = true
        setTabs([...tabs])
      }
    )
  }

  // This function goes through the tabs searching for the appropriate type
  // of visualization
  const search = (e) => {
    var curr_tab = activeTab
    if (typeof e == "string") {
      curr_tab = e
      setActiveTab(curr_tab)
    } else {
      const current_tabs = tabs.map((tab) => {
        tab.searched = false
        // The emoji search is really a search for stickers appending the word
        // "emoji" to the query
        if (tab.search_for == "Emojis" && query != "")
          tab.query = query + " " + "emojis"
        else
          tab.query = query
        return tab
      })
      setTabs(current_tabs)
    }
    if (!tabs[curr_tab].searched) {
      searchGiphy(curr_tab)
    }
  }

  // This function gets called when an image is selected as defined by the
  // react-grid-gallery component: https://www.npmjs.com/package/react-grid-gallery
  const onSelectImage = (index, image) => {
    const curr_tab = tabs[activeTab]
    var updated_results = curr_tab.results.slice()
    var curr = updated_results[index]

    if(curr.hasOwnProperty("isSelected"))
      curr.isSelected = !curr.isSelected
    else
      curr.isSelected = true

     curr_tab.selected = updated_results.filter(result => {
       return result.isSelected
     })
     setTabs([...tabs]);
   }

   // Saves the images that were selected when looking at the grid
   const saveChanges = () => {
     var selected = []
     tabs.forEach((tab) => {
       selected = selected.concat(tab.selected)
     })
     props.updateVisuals(selected)
   }

  return (
    <>
    <Modal className="search-box" show={props.open} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Search Giphy</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <FormControl
              placeholder={"Search..."}
              aria-label="/add aria-label"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-primary" onClick={search}>Search</Button>
            <Button variant="outline-secondary" onClick={clear}>Clear</Button>
          </InputGroup>
          <Tab.Container id="left-tabs-example" activeKey={activeTab} onSelect={search}>
            <Nav variant="tabs" className="results-tabs-nav">
              {tabs.map((tab, index) => (<Nav.Item key={index}> <Nav.Link eventKey={index}> {tab.search_for} </Nav.Link> </Nav.Item>))}
            </Nav>
            <Tab.Content>
              {tabs.map((tab, index) => (
                <Tab.Pane key={index} eventKey={index}>
                  <Container className="result-list">
                    {tab.results != null
                      ? <Gallery onSelectImage={onSelectImage} images={tab.results} margin={5} enableImageSelection={true}/>
                      : "Your search returned 0 results."}
                  </Container>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button variant="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
