import React, { FC, useState, useEffect } from 'react'
import { Container, Row, Col, InputGroup, Form, FormCheck, FormControl, Button, Accordion, Card, ToggleButton, CloseButton, Dropdown } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Stars from 'react-stars'
import axios from 'axios'
import parseMS from 'parse-ms'
import toMS from '@sindresorhus/to-milliseconds'
import { sounds } from "./Data"
import Gallery from 'react-grid-gallery'
import DownloadLink from "react-download-link"

import { SearchBox } from './SearchBox'

// This class defines a time stamp of teh sound events, it is used for both
// start and end time stamps
const TimeStamp = (props) => {

  // Helper function to convert time from hh:mm:ss to ms
  const convertTime = (time) => {
    if (time != "") {
      time = time.split(":").map((t) => {return parseInt(t)})
      const time_object = {
        hours: time[0],
        minutes: time[1],
        seconds: time[2]
      }
      return toMS(time_object)
    } else {
      return null
    }
  }

  // Helper function to convert MS to hh:mm:ss format
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
      console.log("going to return null")
      return null
    }
  }

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
        if (time.length == 8 || time.length == 00) {
          props.onTimeChange(curr.name, convertTime(time))
        }
      }}
      className="no-border"
      />
  )
}

// This function defines the star in the sound event
const Star = (props) => {
  if (props.filled) {
    return <span className="star filled" onClick={props.onClick}> ★ </span>
  } else {
    return <span className="star" onClick={props.onClick}> ☆ </span>
  }
}


// This class defines an individual sound event (i.e. a card in the list of events)
const SoundEvent:FC = (props) => {
  // This state defines whether the card for this event is enabled
  const [enabled, setEnabled] = useState(true)

  // This state holds whether this event is marked as starred
  const [important, setImportant] = useState(false)

  // This state indicated whether the search box is shown or hidden
  const [searchBoxShow, setSearchBoxShow] = useState(false)

  // This state holds the start time of the event
  const [startTime, setStartTime] = useState(props.startTime)

  // This state holds the end time of the event
  const [endTime, setEndTime] = useState(props.endTime)

  // This state holds the visualizations for the event
  const [visuals, setVisuals] = useState([])

  // This state holds whether a description has been entered for the event
  const [descriptionEntered, setDescriptionEntered] = useState(false)

  // This function updates the list of visuals when they are selected in the
  // search box
  const updateVisuals = (newVisuals) => {
    // missing duplicates prevention
    newVisuals = visuals.concat(newVisuals).map((visual) => {
      visual.isSelected = false
      visual.customOverlay = <RemoveVisualOverlay/>
      // visual.thumbnail = visual.original_still
      return visual
    })
    setVisuals(newVisuals)
    props.onValueChange("visuals", newVisuals, props.index)
    closeSearchBox()
  }



  // These functions open and close the search search box
  // ==============================
  const openSearchBox = () => setSearchBoxShow(true)
  const closeSearchBox = () => setSearchBoxShow(false)
  // ==============================



  // This function handle any changes to the start or end times of an event
  const handleTimeChange = (type, time) => {
    if (type == "startTime")
      setStartTime(time)
    else if (type == "endTime")
      setEndTime(time)
    props.onValueChange(type, time, props.index)
  }

  // This function removes a visual from an event when a user clicks on the x
  const removeVisual = (index) => {
    visuals.splice(index, 1)
    props.onValueChange("visuals", visuals, props.index)
    setVisuals([...visuals])
  }

  // This function removes an event when a user clicks on the x
  const disableEvent = () => {
    setEnabled(false)
    props.onValueChange("disabled", true, props.index)
  }

  // This is the element that shows an x above a visual to remove it
  const RemoveVisualOverlay = () => {
    return <>
    <div className="visuals-remove flex">
      <CloseButton variant="white"/>
    </div>
    </>
  }

  if (enabled) {
    return (
        <>
        <Accordion onClick={() => {
          props.onClick(startTime)
        }} className={`sound-event ${props.current ? "current" : ""}`}>
          <Card>
            <Card.Body>
              <Container className="sound-event-card">
                <CloseButton className="dismiss-sound-btn" onClick={disableEvent}/>
                <Row>
                  <Col>
                    <Card.Title>
                      <Container className="timestamps flex">
                        <TimeStamp time={startTime} onClick={props.pauseVideo} onTimeChange={handleTimeChange} name="startTime"/>
                        <span> – </span>
                        <TimeStamp time={endTime} onClick={props.pauseVideo} onTimeChange={handleTimeChange} name="endTime"/>
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
                      autoComplete="off"
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
                  {visuals.length > 0 && <Gallery rowHeight={50} images={visuals} margin={5} backdropClosesModal={true} enableImageSelection={false} onClickThumbnail={removeVisual}/>}
                  {props.visuals && <Button variant="link" onClick={openSearchBox}> Add visuals </Button>}
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Accordion>
        {searchBoxShow && <SearchBox open={searchBoxShow} close={closeSearchBox} updateVisuals={updateVisuals}/>}
        </>
      )
  } else {
    return null
  }
}


// This function defines the list of sound events, containing may SoundEvent objects
export const SoundEvents:FC = (props) => {

  // This state holds whether the "auto-search" was clicked
  const [analyzed, setAnalyzed] = useState(false)


  // This function adds events contained in to_append to the sound events
  const appendEvents = (to_append, type) => {
    const events = props.events
    to_append = to_append.map((event, index) => {
      event.startTime = Math.floor(event.startTime/1000)*1000
      if (event.endTime != null)
        event.endTime = Math.ceil(event.endTime/1000)*1000
      event.important = false
      event.key = events.length + index
      return event
    })
    props.onEventsChange(sortEvents(events.concat(to_append)))
  }

  // This function sorts the events by time stamp
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

  // This function adds an empty event at the current time stamp in the video player
  const appendEmptyEvent = () => {
    appendEvents([{
      "startTime": Math.floor(props.currTime/1000)*1000,
      "endTime": null,
      "label": "",
      "automatic": false
    }])
  }

  // This function loads the events from Data.tsx to the list
  const loadEvents = (e) => {
    setAnalyzed(true)
    console.log(e.target.id)
    var source = props.videoLoaded
    if (e.target.id == "automatic")
      source = source + " Automatic"
    appendEvents(sounds[source])
  }

  // This function updates states when anything is changed in an event
  const handleChange = (property, value, index) => {
    const events = props.events
    events[index][property] = value
    props.onEventsChange(sortEvents([...events]))
  }

  // This function saves all the metadata from the events list as a .json file
  const exportEvents = () => {
    const json = {"events": props.events}
    return JSON.stringify(json)
  }

  // When a new video is loaded, update the state to know it hasn't been analyzed
  useEffect(() => {
    setAnalyzed(false)
    props.onEventsChange([])
  }, [props.videoLoaded])

  return (
    <>
      {props.events.map((event, index) => {
        return <SoundEvent current={event.current} onClick={props.seekVideo} important={event.important} pauseVideo={props.pauseVideo} onValueChange={handleChange} startTime={event.startTime} endTime={event.endTime} label={event.label} index={index} key={event.key} automatic={event.automatic} automaticTags={event.tags} inputPlaceholder={props.inputPlaceholder} visuals={props.visuals}/>
      })}
      <Container className="event-buttons flex">
        <Dropdown>
          <Dropdown.Toggle disabled={analyzed || props.allowVideoUploads || !props.videoLoaded} variant="primary" id="load-events" >
            Auto-search Events
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id="manual" onClick={loadEvents} href="#">Engine A</Dropdown.Item>
            <Dropdown.Item id="automatic" onClick={loadEvents} href="#">Engine B</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={appendEmptyEvent} disabled={!props.videoLoaded}> Add New Event </Button>
        <DownloadLink
          className={`btn btn-primary download-button ${!props.videoLoaded || props.events.length == 0 ? "disabled" : ""}`}
          label="Export"
          filename="Sound Events.json"
          exportFile={exportEvents}
        />
      </Container>
    </>
  )
}
