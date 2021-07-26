// == External
import React, { FC, Component } from 'react'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Button, Accordion, Card} from 'react-bootstrap'

// == App
import { Counter } from './Counter'
import { SearchBoxes } from './SearchBoxes'
import { SoundEvents } from './SoundEvents'
import { VideoPlayer } from './VideoPlayer'

export const App:FC = () => {

  return <Container fluid>
    <Row>
      <Col id="video-player" className="flex flex-centered flex-column">
          <VideoPlayer/>
      </Col>
      <Col id="sound-events">
        <Container>
        <Tabs defaultActiveKey="sound-events" className="mb-3">
          <Tab eventKey="full-transcript" title="Full Transcript" disabled>

          </Tab>
          <Tab eventKey="sound-events" title="Sound Events">
            <SoundEvents />
          </Tab>
        </Tabs>
        </Container>
      </Col>
    </Row>
  </Container>
}
