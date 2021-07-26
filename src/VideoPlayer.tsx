import React, { FC, useState } from 'react'
import { Container } from 'react-bootstrap'
import ReactPlayer from 'react-player'

export const VideoPlayer:FC = () => {
  const [videoFilePath, setVideoFilePath] = useState(null)

  const handleVideoUpload = (event) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <>
      <Container className="flex flex-column flex-centered">
        <ReactPlayer url={videoFilePath} controls={true} width="90%" height="auto"/>
        <input type="file" onChange={handleVideoUpload}/>
      </Container>
    </>
  )
}
