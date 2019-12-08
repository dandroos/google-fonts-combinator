import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import { Container, Row, Col, Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input } from 'reactstrap'

import GFLogo from './imgs/gflogo.png'
import './styles.scss'

function App() {

  const getFonts = () => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status != 200 && xhr.readyState == 4) {
          reject(xhr.responseText);
        }
      }
      xhr.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAZPt82j4_tyfPLEeWYVp14aXp5SM1-PME", true);
      xhr.send();
    })
  }

  const getRandomFont = (target) => {
    if (data.fonts) {
      const randomNumber = Math.floor(Math.random() * data.fonts.items.length)
      const selectedFont = data.fonts.items[randomNumber]
      const temp = Object.assign({}, data)
      temp.link = 
      temp.currentFonts[target].font = selectedFont;
      setData(temp)
    }
  }

  useEffect(() => {
    getFonts().then((fonts) => {
      setData({
        ...data,
        fonts: fonts
      })
    })
  }, [])


  const [data, setData] = useState({
    fonts: null,
    currentFonts: {
      heading: {
        font: null,
        link: null,
        locked: false
      },
      body: {
        font: null,
        link: null,
        locked: false
      }
    },
    modal: false,
    text: {
      heading: 'Heading Text',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic omnis dicta enim sequi qui necessitatibus autem quis exercitationem delectus, consequuntur optio dignissimos. Adipisci enim ipsum, fuga sit explicabo in repudiandae.'
    },
    link: null
  })
  const toggle = () => setData({
    ...data,
    modal: !data.modal
  })

  const handleChange = (e) => {
    const temp = Object.assign({}, data)
    temp.text[e.target.id] = e.target.value
    setData(temp)
  }

  useEffect(() => {
    getRandomFont('heading')
    getRandomFont('body')
  }, [data.fonts])

  useEffect(() => {
    if (data.currentFonts.body.font && data.currentFonts.heading.font) {
      const temp = Object.assign({}, data)
      temp.currentFonts.body.link = temp.currentFonts.body.font.family.replace(/ /g, '+')
      temp.currentFonts.heading.link = temp.currentFonts.heading.font.family.replace(/ /g, '+')
      temp.link = `https://fonts.googleapis.com/css?family=${temp.currentFonts.heading.link}|${temp.currentFonts.body.link}`
      setData(temp)
    }
  }, [data.currentFonts.body.font, data.currentFonts.heading.font])

  const handleClick = () => {
    if (!data.currentFonts.heading.locked) {
      getRandomFont('heading')
    }
    if (!data.currentFonts.body.locked) {
      getRandomFont('body')

    }
  }

  const lock = (e) => {
    const temp = Object.assign({}, data)
    temp.currentFonts[e.target.id].locked = !temp.currentFonts[e.target.id].locked
    setData(temp)
  }

  return (
    <div className="App p-3">
      {data.headingFontLink ? <Helmet>
        <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${data.currentFonts.heading.link}`} />
        <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${data.currentFonts.body.link}`} />
      </Helmet> : null}

      <Container>
        <Row>
          <Col className="d-flex align-items-center">
            <img src={GFLogo} width="30" alt="Google Fonts logo"/>
            <h1 className="ml-2"><small>Google Fonts Combinator</small></h1>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
          <Button id="heading" size="sm" color={data.currentFonts.heading.locked ? 'danger' : 'success'} onClick={lock}>{data.currentFonts.heading.locked ? 'Heading Locked' : 'Heading Unlocked'}</Button>
              <Button id="body" size="sm" color={data.currentFonts.body.locked ? 'danger' : 'success'} onClick={lock} className="ml-2">{data.currentFonts.body.locked ? 'Body Locked' : 'Body Unlocked'}</Button>
            <Button size="sm" color="primary" className="ml-2"  onClick={handleClick}>Refresh fonts</Button>
            <Button size="sm" className="ml-2" onClick={toggle}>Edit text</Button>
          </Col>
        </Row>
        {data.currentFonts.heading.font && data.currentFonts.body.font ?
          <div className="mt-4">
            <h2 className="display-3" id="heading-text" style={{
              fontFamily: data.currentFonts.heading.font.family
            }}>{data.text.heading}</h2>
            <p id="body-text" style={{
              fontFamily: data.currentFonts.body.font.family
            }}>{data.text.body}</p>

            <div className="text-center">
              
            </div>
            <Input type="textarea" value={data.link} readOnly />
          </div>

          : null}

      </Container>
      <Modal isOpen={data.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Text</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="heading">Heading</Label>
            <Input type="text" id="heading" value={data.text.heading} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="body">Body</Label>
            <Input type="textarea" id="body" value={data.text.body} onChange={handleChange}  />
          </FormGroup>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default App;
