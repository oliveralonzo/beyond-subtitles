import React, { FC, useState } from 'react'
import { Container, Row, Col, InputGroup, Form, FormCheck, FormControl, Button, Accordion, Card, ToggleButton, Modal, CloseButton } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Stars from 'react-stars'
import axios from 'axios'
import parseMS from 'parse-ms'
import toMS from '@sindresorhus/to-milliseconds'
import { sounds } from "./Dummy"

import { SearchBox } from './SearchBox'

const SoundEvent:FC = (props) => {
  const [enabled, setEnabled] = useState(true)
  const [important, setImportant] = useState(false)
  const [searchBoxShow, setSearchBoxShow] = useState(false)
  const [startTime, setStartTime] = useState(props.startTime)
  const [endTime, setEndTime] = useState(props.endTime)

  const handleClose = () => setSearchBoxShow(false)
  const handleShow = () => setSearchBoxShow(true)

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
        onInput={(e) => {e.currentTarget.value = e.currentTarget.value.replace(/[^0-9:]/g, '').replace(/((:|^).?):/g, '$1').replace(/([0-9][0-9])[0-9]/g, '$1')}}
        placeholder="00:00:00"
        value={props.time}
        className="no-border"/>
    )
  }

  const Star = (props) => {
    if (props.filled) {
      return <span className="star filled"> ★ </span>
    } else {
      return <span className="star"> ☆ </span>
    }
  }

  return (
    <>
      <Accordion className="sound-event">
        <Card>
          <Card.Body>
            <Container className="sound-event-card">
              <Row>
                <Col>
                  <Card.Title>
                    <Container className="timestamp flex">
                      <TimeStamp time={startTime}/>
                      <span> – </span>
                      <TimeStamp time={endTime}/>
                    </Container>
                  </Card.Title>
                </Col>
                <Col className="right-align">
                  <Container className="no-border clickable" onClick={(e) => setImportant(!important)}> <Star filled={important}> </Star> </Container>
                  {/*<ToggleButton
                    className="mb-2"
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-primary"
                    checked={important}
                    value="1"
                    onChange={(e) => setImportant(e.currentTarget.checked)}
                  >
                    Important
                  </ToggleButton>/*}
                  {/*<Form.Check
                    checked={important}
                    onChange={(e) => setImportant(e.currentTarget.checked)}
                    type="switch"
                    id="custom-switch"/>*/}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Sound Label…"
                    className="no-border"
                    value={props.label}
                  />
                </Col>
                <Col className="right-align">
                  {/*}<CustomToggle eventKey="0"> Visuals </CustomToggle> */}
                  <Button variant="link" onClick={handleShow}> Add visuals </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
          <Accordion.Collapse eventKey="0">
            <Container>
              <Card.Body>More settings for each sound event will be here </Card.Body>
            </Container>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Modal className="search-box" show={searchBoxShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Giphy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBoxes/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const SoundEvents:FC = () => {
  const [events, setEvents] = useState([])

  const appendEvent = () => {
    setEvents(() => {
      key = events.length
      return [...events, <SoundEvent key={key}/>]
    })
  }

  const loadJSON = async () => {
    const response = await axios.get("http://localhost:3000/sounds")
    setEvents(() => {
      return response.data.map((event, index) => {
        return <SoundEvent startTime={event.startTime} endTime={event.endTime} label={event.label} key={index}/>
      })
    })
  }

  return (
    <>
      {events}
      <Container>
        <Row>
          <Button variant="primary" className="new-event" onClick={appendEvent}> New Event </Button>
        </Row>
        <Row>
          <Button variant="primary" className="new-event" onClick={loadJSON}> Analyze Video </Button>
        </Row>
      </Container>
    </>
  )
}
