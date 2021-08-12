import React, { FC, useState } from 'react'
import { Container, Form, ButtonGroup, ToggleButton, DropdownButton, InputGroup, Dropdown, FormControl } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import Draggable from 'react-draggable'
import {Resizable} from 're-resizable'
import {Rnd} from 'react-rnd'
import {Rotatable} from 'react-rotatable'
import Moveable from "react-moveable"

const Visual:FC = (props) => {
  const defaultInitialWidth = 15

  const [position, setPosition] = useState(() => {
      if (props.position != null)
        return {x:props.position.x, y:props.position.y}
      else
        return {x:0, y:0}
  })
  const [rotation, setRotation] = useState(props.rotation)
  const [width, setWidth] = useState(() => {
    if (props.width != null)
      return props.width
    else
      return defaultInitialWidth
  })

  const handleDrag = (e, ui) => {
    const newPosition = {x: ui.x, y: ui.y}
    setPosition(newPosition)
    props.onChange(newPosition, rotation, width, props.eventIndex, props.index)
  }

  const handleRotation = (e, ui, newRotation) => {
    setRotation(newRotation)
    props.onChange(position, newRotation, width, props.eventIndex, props.index)
  }

  const handleResize = (e, direction, ref, d) => {
    const newWidth = parseFloat(ref.style.width)
    setWidth(newWidth)
    props.onChange(position, rotation, newWidth, props.eventIndex, props.index)
  }

  return <>
      <Draggable bounds="parent" onStop={handleDrag} defaultPosition={position}>
        <Resizable defaultSize={{width: `${width}%`}}
          className={`box visual-wrapper`}
          style={{
            height: `${(props.visual.thumbnailHeight / props.visual.thumbnailWidth) * props.width}%`
          }}
          lockAspectRatio={true}
          onResizeStop={handleResize}
        >
        <Rotatable canRotate={!props.videoPlaying} onRotateStop={handleRotation}>
          <div className={`visual  ${props.videoPlaying ? "" : "draggable"}`} style={{
            backgroundImage: `url(${props.videoPlaying ? props.visual.src : props.visual.src})`,
            paddingBottom: `${(props.visual.thumbnailHeight / props.visual.thumbnailWidth) * 100}%`,
            transform: `rotate(${rotation})`
          }}>
          </div>
        </Rotatable>
        </Resizable>
      </Draggable>
  </>
}

export const VideoPlayer:FC = (props) => {
  const [videoFilePath, setVideoFilePath] = useState(null)
  const [show, setShow] = useState("descriptions")
  const [playing, setPlaying] = useState(false)
  const [currVideo, setCurrVideo] = useState(null)

  const videoFiles = ["YouTube", "BBC", "TikTok"]

  const handleVideoUpload = (event) => {
    const path = URL.createObjectURL(event.target.files[0])
    const name = path.name
    setVideoFilePath(path)
    setCurrVideo(name)
    props.onVideoLoad(name)
  }

  const handleVideoSelect = (video) => {
    props.onVideoLoad(video)
    setCurrVideo(video)
  }

  const onPlayPause = () => {
    setPlaying(!playing)
    props.onPlayPause(!playing)
  }

  return (
    <>
        <Container className="video-wrapper flex flex-centered">
          <Container className="video-overlay">
            {show === "descriptions" &&
              <Container className="descriptions flex flex-column">
                {props.currEvents.map((event, index) => {
                  console.log("current events updated")
                  return  <div key={index} className="description"> [{event.label}] </div>
                })}
              </Container>}
            {show === "visuals" &&
              <Container className="visuals flex flex-column">
                {props.currEvents.map((event, eventIndex) => {
                  if (event.visuals) {
                    return event.visuals.map((visual, visualIndex) => {
                      return <Visual key={event.index + visualIndex} eventIndex={event.index} position={visual.position} rotation={visual.rotation} width={visual.width} onChange={props.onVisualsChange} index={visualIndex} visual={visual} videoPlaying={playing}/>
                    })
                  }
                })}
              </Container>}
          </Container>
          {currVideo && <ReactPlayer ref={props.player} url={`static/videos/${currVideo}.mp4`} controls={true} width="100%" height="100%" onProgress={props.onProgress} onPlay={onPlayPause} onPause={onPlayPause}  />}
        </Container>
        {/*<Form.Group className="mb-3">
          <Form.Control type="file" onChange={handleVideoUpload}/>
        </Form.Group>*/}
          <DropdownButton variant="outline-secondary" title={currVideo ? currVideo : "Select File"} id="input-group-dropdown-1">
            {videoFiles.map((video, index) => {
              return <Dropdown.Item key={index} onClick={() => handleVideoSelect(video)}>{video}</Dropdown.Item>
            })}
          </DropdownButton>
          {/*<FormControl disabled value={currVideo} onChange={(e) => {return}} aria-label="Label for current video" />*/}
        {currVideo != null && <Container className="flex flex-column flex-centered">
        Preview
        <ButtonGroup>
          {["descriptions", "visuals", "off"].map((value, index) => {
            return <ToggleButton
              key={index}
              id={`radio-${value}`}
              type="radio"
              variant="outline-primary"
              name="radio"
              value={value}
              checked={show === value}
              onChange={(e) => setShow(e.currentTarget.value)}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </ToggleButton>
          })}
      </ButtonGroup>
      </Container>}
    </>
  )
}
