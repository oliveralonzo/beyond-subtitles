// == External
import React, { FC, Component, useState } from 'react'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Button, Accordion, Card} from 'react-bootstrap'

// == App
import { SearchBoxes } from './SearchBoxes'
import { SoundEvents } from './SoundEvents'
import { VideoPlayer } from './VideoPlayer'

export const App:FC = () => {
  // This state holds the video player to handle things like jumping to a specific time in handleSeekVideo
  const [videoPlayer, setVideoPlayer] = useState(null)

  // This state holds whether there is a video currently loaded to enable the buttons in sound events
  const [videoLoaded, setVideoLoaded] = useState(null)

  // This state holds whether the video is currently playing, which changes how some things are handled
  const [videoPlaying, setVideoPlaying] = useState(false)

  // This state holds the current time stamp of the video player, for things like creating new events at that time
  const [currMilliseconds, setCurrMilliseconds] = useState(null)

  // This state holds all events, mostly used and modified inside the SoundEvents component
  const [events, setEvents] = useState([])

  // This state holds only the events at the current time stamp, mostly used for the video overlay in VideoPlayer
  const [currEvents, setCurrEvents] = useState([])

  // Reference object for the video player
  const ref = (player) => {
    setVideoPlayer(player)
  }

  // Functions passed to the VideoPlayer component to update state in the App
  // ========================================
  const handleVideoLoad = (loaded) => {
    setVideoLoaded(loaded)
  }
  const handleVideoPlaying = () => {
    setVideoPlaying(!videoPlaying)
    updateCurrEvents(videoPlayer.getCurrentTime(), videoPlaying)
  }

  const handleVideoProgress = (time) => {
    updateCurrEvents(time.playedSeconds, videoPlaying)
    setCurrMilliseconds(time.playedSeconds*1000)
  }

  const handleVisualsUpdate = (position, rotation, width, index, visualIndex) => {
    events[index].visuals[visualIndex].position = position
    events[index].visuals[visualIndex].rotation = rotation
    events[index].visuals[visualIndex].width = width
    setEvents([...events])
    updateCurrEvents(videoPlayer.getCurrentTime(), videoPlaying)
  }
  // ========================================

  // Functions passed to the SoundEvents component to update state in the App or interact with VideoPlayer
  // ========================================
  const handleEventsChange = (events) => {
    setEvents(events)
    if (videoPlayer != null)
      updateCurrEvents(videoPlayer.getCurrentTime(), videoPlaying, updatedEvents = events)
  }

  const handleSeekVideo = (time) => {
    console.log(time)
    setVideoPlaying(false)
    videoPlayer.seekTo(time/1000)
    updateCurrEvents(videoPlayer.getCurrentTime(), false)
  }

  // ========================================

  // Helper function to update currEvents when pretty much anything changes
  const updateCurrEvents = (playedSeconds, videoPlaying = false, updatedEvents = events) => {
    console.log("updating current events ",videoPlaying)
    var currMilliseconds = Math.floor(playedSeconds)*1000
    var waitTime = 0
    if (videoPlaying) {
      currMilliseconds += 1000
      waitTime = (currMilliseconds - playedSeconds*1000)
    }
    setTimeout(() => {
      setCurrEvents(updatedEvents.filter((event, index) => {
        const current = !event.disabled && event.startTime <= currMilliseconds && (event.endTime == null || event.endTime > currMilliseconds)
        updatedEvents[index].current = current
        updatedEvents[index].index = index
        return current
      }))
      setEvents(updatedEvents)
    }, waitTime);
  }

  return <Container fluid>
    <Row>
      <Col id="video-player" className="flex flex-centered flex-column">
          <VideoPlayer player={ref} onVisualsChange={handleVisualsUpdate} playing={videoPlaying} onVideoLoad={handleVideoLoad} onProgress={handleVideoProgress} currEvents={currEvents} onPlayPause={handleVideoPlaying}/>
      </Col>
      <Col id="sound-events">
        <Container>
        <Tabs defaultActiveKey="sound-events" className="mb-3">
          <Tab eventKey="full-transcript" title="Full Transcript" disabled>
          </Tab>
          <Tab eventKey="sound-events" title="Sound Events">
            <SoundEvents events={events} seekVideo={handleSeekVideo} currTime={currMilliseconds} onEventsChange={handleEventsChange} videoLoaded={videoLoaded} visuals={true} inputPlaceholder="Describe sound…"/>
          </Tab>
        </Tabs>
        </Container>
      </Col>
    </Row>
  </Container>
}
