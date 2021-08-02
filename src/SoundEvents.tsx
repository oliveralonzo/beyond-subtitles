import React, { FC, useState, useEffect } from 'react'
import { Container, Row, Col, InputGroup, Form, FormCheck, FormControl, Button, Accordion, Card, ToggleButton, CloseButton } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Stars from 'react-stars'
import axios from 'axios'
import parseMS from 'parse-ms'
import toMS from '@sindresorhus/to-milliseconds'
import { sounds } from "./Dummy"
import Gallery from 'react-grid-gallery'

import { SearchBox } from './SearchBox'

const SoundEvent:FC = (props) => {
  const [enabled, setEnabled] = useState(true)
  const [important, setImportant] = useState(false)
  const [searchBoxShow, setSearchBoxShow] = useState(false)
  const [startTime, setStartTime] = useState(props.startTime)
  const [endTime, setEndTime] = useState(props.endTime)
  const [visuals, setVisuals] = useState([])
  const [descriptionEntered, setDescriptionEntered] = useState(false)

  const updateVisuals = (newVisuals) => {
    // figure out how to prevent duplicates
    newVisuals = visuals.concat(newVisuals).map((visual) => {
      visual.isSelected = false
      return visual
    })
    setVisuals(newVisuals)
    props.onValueChange("visuals", newVisuals, props.index)
    closeSearchBox()
  }

  const openSearchBox = () => setSearchBoxShow(true)
  const closeSearchBox = () => setSearchBoxShow(false)

  const handleTimeChange = (type, time) => {
    if (type == "startTime")
      setStartTime(time)
    else if (type == "endTime")
      setEndTime(time)
    props.onValueChange(type, time, props.index)
  }

  const convertTime = (time) => {
    time = time.split(":").map((t) => {return parseInt(t)})
    const time_object = {
      hours: time[0],
      minutes: time[1],
      seconds: time[2]
    }

    console.log(time_object)
    return toMS(time_object)
  }

  const formatMS = (milliseconds) => {
    if (milliseconds != null) {
      const time = parseMS(milliseconds)
      var hours = time.hours
      var minutes = time.minutes
      var seconds = time.seconds

      hours = (hours < 10) ? "0" + hours : hours
      minutes = (minutes < 10) ? "0" + minutes : minutes
      seconds = (seconds < 10) ? "0" + seconds : seconds

      const formattedTime = hours + ":" + minutes + ":" + seconds

      return formattedTime
    } else {
      return null
    }
  }

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );

    return (
      <Button className="card-toggle" onClick={decoratedOnClick} variant="link">
        {children}
      </Button>
    );
  }

  const TimeStamp = (props) => {
    return (
      <Form.Control
        type="text"
        maxLength="8"
        autoComplete="off"
        onInput={(e) => {
          // This needs to be cleaned up to make sure that it is usable (e.g. right now replacing something in the middle removes the rest)
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9:]/g, '').replace(/((:|^).?):/g, '$1]').replace(/([0-9][0-9])[0-9]/g, '$1')}}
        placeholder="00:00:00"
        name={props.name}
        defaultValue={formatMS(props.time)}
        onChange={(e) => {
          // This needs to be cleaned up to make sure that the time is always in the right format
          const curr = e.currentTarget
          const time = curr.value
          if (time.length == 8) {
            handleTimeChange(curr.name, convertTime(time))
          }
        }}
        className="no-border"/>
    )
  }

  const Star = (props) => {
    if (props.filled) {
      return <span className="star filled" onClick={props.onClick}> ★ </span>
    } else {
      return <span className="star" onClick={props.onClick}> ☆ </span>
    }
  }

  if (enabled) {
    return (
        <>
        <Accordion onClick={() => props.onClick(startTime)} className="sound-event">
          <Card>
            <Card.Body>
              <Container className="sound-event-card">
                <CloseButton className="dismiss-sound-btn" onClick={(e) => setEnabled(false)}/>
                <Row>
                  <Col>
                    <Card.Title>
                      <Container className="timestamp flex">
                        <TimeStamp time={startTime} name="startTime"/>
                        <span> – </span>
                        <TimeStamp time={endTime} name="endTime"/>
                      </Container>
                    </Card.Title>
                  </Col>
                  <Col className="right-align">
                    <Container className="no-border clickable">
                      <Star
                        filled={props.important}
                        onClick={(e) => {
                          props.onValueChange("important", !props.important, props.index)
                        }}
                      />
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder={props.inputPlaceholder}
                      className="no-border"
                      defaultValue={props.label}
                      name="label"
                      onChange={(e)=>{
                        const curr = e.currentTarget
                        setDescriptionEntered(true)
                        props.onValueChange(curr.name, curr.value, props.index)
                      }}
                    />
                    <Form.Text className="text-muted">
                      {props.automaticTags && <>Automatic labels: {props.automaticTags}</>}
                      {!descriptionEntered && props.automatic && !props.automaticTags && <>Automatic suggestion, consider making the label more descriptive </>}
                    </Form.Text>
                  </Col>
                </Row>
                <Row className="sound-event-visuals flex">
                  {visuals.length > 0 && <Gallery rowHeight={50} images={visuals} margin={5} enableImageSelection={false}/>}
                  {props.visuals && <Button variant="link" onClick={openSearchBox}> Add visuals </Button>}
                </Row>
              </Container>
            </Card.Body>
            <Accordion.Collapse eventKey="0">
              <Container>
                <Card.Body>More information about each sound event will be here </Card.Body>
              </Container>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {searchBoxShow && <SearchBox open={searchBoxShow} close={closeSearchBox} updateVisuals={updateVisuals}/>}
        </>
      )
  } else {
    return null
  }
}

export const SoundEvents:FC = (props) => {
  const [events, setEvents] = useState([])
  const [analyzed, setAnalyzed] = useState(false)

  const appendEvents = (to_append, type) => {
    const curr_events_length = events.length
    to_append = to_append.map((event, index) => {
      event.important = false
      event.key = events.length + index
      return event
    })
    setEvents(sortEvents(events.concat(to_append)))
  }

  const sortEvents = (toSort) => {
    return toSort.sort((a,b) => {
      if (a.startTime != null && b.startTime != null) {
        if (a.startTime == b.startTime)
          return a.endTime - b.endTime
        return a.startTime - b.startTime
      }
      else if (a.startTime)
        return -1
      else
        return 1
    })
  }

  const appendEmptyEvent = () => {
    appendEvents([{
      "startTime": props.videoPlayer.getCurrentTime()*1000,
      "endTime": null,
      "label": "",
      "automatic": false
    }])
  }

  const loadEvents = () => {
    appendEvents(sounds[props.source])
    setAnalyzed(true)
  }

  const handleChange = (property, value, index) => {
    events[index][property] = value
    setEvents(sortEvents([...events]))
  }

  const seekVideo = (time) => {
    props.videoPlayer.seekTo(time/1000)
  }

  useEffect(() => {
    console.log(props.videoLoaded)
    setAnalyzed(false)
    setEvents([])
  }, [props.videoLoaded])

  return (
    <>
      {events.map((event, index) => {
        return <SoundEvent onClick={seekVideo} important={event.important} onValueChange={handleChange} startTime={event.startTime} endTime={event.endTime} label={event.label} index={index} key={event.key} automatic={event.automatic} automaticTags={event.tags} inputPlaceholder={props.inputPlaceholder} visuals={props.visuals}/>
      })}
      <Container className="event-buttons flex">
          <Button variant="primary" onClick={loadEvents} disabled={analyzed || !props.videoLoaded}> Auto-search Events </Button>
          <Button variant="primary" onClick={appendEmptyEvent} disabled={!props.videoLoaded}> Add New Event </Button>
          <Button variant="primary" disabled={!props.videoLoaded || events.length == 0}> Export </Button>
      </Container>
    </>
  )
}
