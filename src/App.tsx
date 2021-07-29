// == External
import React, { FC, Component, useState } from 'react'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Button, Accordion, Card} from 'react-bootstrap'

// == App
import { Counter } from './Counter'
import { SearchBoxes } from './SearchBoxes'
import { SoundEvents } from './SoundEvents'
import { VideoPlayer } from './VideoPlayer'

export const App:FC = () => {
  const [videoPlayer, setVideoPlayer] = useState(null)

  const ref = (player) => {
    setVideoPlayer(player)
  }

  return <Container fluid>
    <Row>
      <Col id="video-player" className="flex flex-centered flex-column">
          <VideoPlayer player={ref}/>
      </Col>
      <Col id="sound-events">
        <Container>
        <Tabs defaultActiveKey="sound-events" className="mb-3">
          <Tab eventKey="visual-events" title="Visual Events">
            <SoundEvents videoPlayer={videoPlayer} source="yapeng" visuals={false} inputPlaceholder="Describe visual scene…"/>
          </Tab>
          <Tab eventKey="sound-events" title="Sound Events">
            <SoundEvents videoPlayer={videoPlayer} source="dog" visuals={true} inputPlaceholder="Describe sound…"/>
          </Tab>
        </Tabs>
        </Container>
      </Col>
    </Row>
  </Container>
}
