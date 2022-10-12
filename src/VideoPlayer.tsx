import React, { FC, useState } from 'react'
import { Container, Form, ButtonToolbar, ButtonGroup, ToggleButton, DropdownButton, InputGroup, Dropdown, FormControl } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import Draggable from 'react-draggable'
import {Resizable, HandleClassName} from 're-resizable'
import {Rnd} from 'react-rnd'
import {Rotatable} from 'react-rotatable'
import Moveable from "react-moveable"

// This class defines the visualizations or "Graphic Captions" that are overlayed
// on the video player
const Visual:FC = (props) => {
  // This is the default initial Width for visualizations
  const defaultInitialWidth = 15

  // This state holds the position of a visualization, initiallly set to (0,0)
  const [position, setPosition] = useState(() => {
      if (props.position != null)
        return {x:props.position.x, y:props.position.y}
      else
        return {x:0, y:0}
  })

  // This state holds the angle for the rotation of a visualization
  const [rotation, setRotation] = useState(props.rotation)

  // This state holds the configuration of whether a visualization can be
  // dragged, to disable dragging while the video is playing
  const [disableDragging, setDisableDragging] = useState(false)

  // This state holds the width of the visualization
  const [width, setWidth] = useState(() => {
    if (props.width != null)
      return props.width
    else
      return defaultInitialWidth
  })

  // This state holds the height of the visualization
  const [height, setHeight] = useState(0)



  // These functions handle the dragging, rotating and resizing of visualizations
  // ========================================
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
    const newWidth = width*parseFloat(ref.style.width)/100
    setWidth(newWidth)
    setHeight(ref.style.height)
    setDisableDragging(false)
    props.onChange(position, rotation, newWidth, props.eventIndex, props.index)
    console.log(d)
  }

  const handleResizeStart = (e, direction, ref) => {
    // need to disable dragging while resizing to prevent the visualization from moving
    setDisableDragging(true)
    setHeight(ref.offsetHeight + "px")
    ref.style.height = ref.offsetHeight + "px"
    ref.style.paddingBottom = 0
  }
  // ========================================



  return <>
      <Draggable cancel=".handles" bounds="parent" onStop={handleDrag} defaultPosition={position} disabled={disableDragging}>
        <div className="box visual-wrapper flex flex-centered" style={{width: `${width}%`}}>
        <Rotatable canRotate={!props.videoPlaying} onRotateStop={handleRotation}>
          <Resizable size={{width: `100%`, height: height}} defaultSize={{height: height}}
          handleClasses={{bottom: "handles", bottomLeft: "handles", bottomRight: "handles", left: "handles", right: "handles", top: "handles", topLeft: "handles", topRight: "handles"}}
          className={`visual  ${props.videoPlaying ? "" : "draggable"}`} style={{
            backgroundImage: `url(${props.videoPlaying ? props.visual.src : props.visual.src})`,
            paddingBottom: `${(props.visual.thumbnailHeight / props.visual.thumbnailWidth) * 100}%`,
            transform: `rotate(${rotation})`
          }}
            lockAspectRatio={true}
            onResizeStop={handleResize}
            onResizeStart={handleResizeStart}
          >
          </Resizable>
        </Rotatable>
        </div>
      </Draggable>

  </>
}



// This class creates the video player, which also has a container for visualizations
export const VideoPlayer:FC = (props) => {
  // This state holds the filepath for the current video
  const [videoFilePath, setVideoFilePath] = useState(null)

  // This state holds the current configuration for what the preview shows
  const [preview, setPreview] = useState("descriptions")

  // This state holds the current configuration for whether the preview shows
  // all or only the starred events
  const [importantOnly, setImportantOnly] = useState(false)

  // This state holds the currVideo
  const [currVideo, setCurrVideo] = useState(null)

  // A list of the default videos for the demos
  const videoFiles = ["YouTube", "BBC", "TikTok"]


  // This function handles users' video uploads when "allowVideoUploads" is set to true in App.tsx
  const handleVideoUpload = (event) => {
    const file = event.target.files[0]
    const path = URL.createObjectURL(file)
    const name = file.name
    setVideoFilePath(path)
    props.onVideoLoad(name)
    setCurrVideo(name)
  }

  // This function handles the video selection from the predetermined list when
  // "allowVideoUploads" is set to false in App.tsx
  const handleVideoSelect = (video) => {
    props.onVideoLoad(video)
    setCurrVideo(video)
  }

  return (
    <>
        <Container className="video-wrapper flex flex-centered">
          <Container className="video-overlay">
            {preview === "descriptions" &&
              <Container className="descriptions flex flex-column">
                {props.currEvents.map((event, index) => {
                  if (!importantOnly || event.important)
                    return  <div key={index} className="description"> [{event.label}] </div>
                })}
              </Container>}
            {preview === "visuals" &&
              <Container className="visuals flex flex-column">
                {props.currEvents.map((event, eventIndex) => {
                  if (event.visuals) {
                    return event.visuals.map((visual, visualIndex) => {
                      if (!importantOnly || event.important)
                        return <Visual key={event.index + visualIndex} eventIndex={event.index} position={visual.position} rotation={visual.rotation} width={visual.width} onChange={props.onVisualsChange} index={visualIndex} visual={visual} videoPlaying={props.playing}/>
                    })
                  }
                })}
              </Container>}
          </Container>
          {currVideo && <ReactPlayer ref={props.player} url={props.allowVideoUploads ? videoFilePath : `static/videos/${currVideo}.mp4`} playing={props.playing} controls={true} width="100%" height="100%" onProgress={props.onProgress} onPlay={props.onPlayPause} />}
        </Container>
        {props.allowVideoUploads && <Form.Group className="mb-3">
          <Form.Control type="file" onChange={handleVideoUpload}/>
        </Form.Group>}
        {!props.allowVideoUploads &&
          <Container className="flex flex-centered mb-3">
            <DropdownButton variant="outline-secondary" title={currVideo ? currVideo : "Select File"} id="input-group-dropdown-1">
              {videoFiles.map((video, index) => {
                return <Dropdown.Item key={index} onClick={() => handleVideoSelect(video)}>{video}</Dropdown.Item>
              })}
            </DropdownButton>
          </Container>}
        {!currVideo && <a href="#" onClick={() => props.setAllowVideoUploads(!props.allowVideoUploads)}> {props.allowVideoUploads ?  "or use a demo file" : "or upload your own"}  </a>}
        {currVideo != null && <Container className="preview-toolbar flex flex-column flex-centered">
            <h4> Preview </h4>
            <ButtonToolbar className="justify-content-between">
            <ButtonGroup>
              {["descriptions", "visuals", "off"].map((value, index) => {
                return <ToggleButton
                  key={index}
                  id={`preview-${value}`}
                  type="radio"
                  variant="outline-primary"
                  name="preview"
                  value={value}
                  checked={preview === value}
                  onChange={(e) => setPreview(e.currentTarget.value)}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </ToggleButton>
              })}
          </ButtonGroup>
          <ButtonGroup>
            {["all", "starred"].map((value, index) => {
              return <ToggleButton
                key={index}
                id={`importantOnly-${value}`}
                type="radio"
                variant="outline-primary"
                name="importantOnly"
                value={value}
                className={`${preview == "off" ? "disabled" : ""}`}
                checked={value == "starred" ? importantOnly : !importantOnly}
                onChange={(e) => setImportantOnly(value == "starred")}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </ToggleButton>
            })}
        </ButtonGroup>
        </ButtonToolbar>
      </Container>}
    </>
  )
}
