import React, { FC, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import ReactPlayer from 'react-player'

export const VideoPlayer:FC = (props) => {
  const [videoFilePath, setVideoFilePath] = useState(null)

  const handleVideoUpload = (event) => {
    const path = URL.createObjectURL(event.target.files[0])
    setVideoFilePath(path)
    props.onVideoLoad(event.target.files[0].name)
  }

  return (
    <>
      <Container className="flex flex-column flex-centered">
        <ReactPlayer ref={props.player} url={videoFilePath} controls={true} width="90%" height="auto"/>
        <Form.Group className="mb-3">
          <Form.Control type="file" onChange={handleVideoUpload}/>
        </Form.Group>
      </Container>
    </>
  )
}
