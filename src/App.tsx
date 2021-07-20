// == External
import React, { FC, Component } from 'react'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Button} from 'react-bootstrap'

// == App
import { Counter } from './Counter'
import { SearchBox } from './SearchBox'


export const App:FC = () => {

  return <Container fluid>
    {/*<Row>
      <Col>
        <h1>hello world</h1>
        <Counter />
      </Col>
    </Row>*/}
    <Row>
      <Col>
        <Row id="video-player">
        Video Player
        </Row>
        <Row id="search-box">
          <Container>
            <Tabs defaultActiveKey="gifs" id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="gifs" title="GIFs">
                <SearchBox/>
              </Tab>
              <Tab eventKey="emojis" title="Emojis">

              </Tab>
            </Tabs>
          </Container>
        </Row>
      </Col>
      <Col id="sound-events">
      Sound Events
      </Col>
    </Row>
  </Container>
}
