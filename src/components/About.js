import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../style/images/orange.jpg";
import { Carousel, Container, Col, Row } from "react-bootstrap";
import Typist from 'react-typist';
import '../style/css/Typist.css'
import Harry from "./whoarewe/Harry.jpg";
import Zi from "./whoarewe/Zi.jpg";
import Josh from "./whoarewe/Josh.jpg";
import Anastasiia from "./whoarewe/Anastasiia.jpg";

export default class About extends Component {
  render() {
    return (
      <div style={containerPrimary}>
        <div style={topBanner}></div>
        <div style={welcomeMessage1}>
          <Typist avgTypingDelay={120} >
              <span>The new way to get lai</span>
              <Typist.Backspace count={3} delay={800} />
              <span>paid is here...</span>
          </Typist>
        </div>
          <h6 style={welcomeMessage2}>
            This is the future of finding the perfect professional match.
          </h6>
        <Container style={carouselStyle}>
        <Row className="justify-content-center">
        <Col>
        <div style={aboutUsStyle}>
          So, who are we and what do we believe in?
          <p style={{ fontSize: 20, fontWeight: "400" }}> We are a team of software engineers who came together in pursuit of one simple belief: right now, the recruitment process is cold, unforgiving and de-humanising. And this sucks. It sucks for everyone...including the employer. We think the experience should be fun, simple and consider not just job skills, but your traits as a human being. We are humanising the recruitment process.  </p>
        </div>
        </Col>
        <Col>
        <Row className="justify-content-center">
          <Carousel style={{ width: "385px"}}> 
            <Carousel.Item style={{alignItems: "center", alignItems: "center"}}>
              <img
              style={{borderRadius: "15px"}}
              height={400}
              width={280}
              className="w-10"
              src={Zi}
              alt="Zi"
              />
              <Carousel.Caption style={captionStyle}>
                <h3>Zi Deng</h3>
                <p>The Solid All Rounder</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
              style={{borderRadius: "15px"}}
              className="w-10"
              height={400}
              width={280}
              src={Josh}
              alt="Josh"
              />
              <Carousel.Caption style={captionStyle}>
                <h3>Josh Hemsley</h3>
                <p>The backend nutjob</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
              style={{borderRadius: "15px"}}
              className="d-block, w-10"
              height={400}
              width={280}
              src={Anastasiia}
              alt="Anastasiia"
              />
              <Carousel.Caption style={captionStyle}>
                <h3>Anastasiia Blaha</h3>
                <p>Chief README Officer</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
              style={{borderRadius: "15px"}}
              className="w-10"
              height={400}
              width={280}
              src={Harry}
              alt="Harry"
              />
              <Carousel.Caption style={captionStyle}>
                <h3>Harry Riley</h3>
                <p>Just annoyed Josh most of the time</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </Row>
          </Col>
          </Row>
          </Container>
      </div>
    );
  }
}

const containerPrimary = {
  backgroundImage: `url(${background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  height: "100%",
  position: "center",
  paddingBottom: "200px",
  alignItems: "center"
};

const welcomeMessage1 = {
  paddingTop: "40px",
  paddingBottom: "20px",
  backgroundColor: "rgba(52, 52, 52, 0.7)",
  fontSize: 75,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
};

const welcomeMessage2 = {
  color: "#fff",
  textAlign: "center",
  paddingBottom: "25px",
  backgroundColor: "rgba(52, 52, 52, 0.7)"
};

const carouselStyle = {
  textAlign: "center",
  margin: "auto",
  marginTop: "100px",
  alignItems: "center"
};

const topBanner = {
  paddingTop: "100px"
}

const captionStyle = {
  backgroundColor: "rgba(52, 52, 52, 0.7)",
  alignItems: "center"
}

const aboutUsStyle = {
  padding: "15px",
  backgroundColor: "rgba(52, 52, 52, 0.95)",
  fontSize: 40,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
  marginTop: "10px",
  borderRadius: "15px",
  marginRight: "30px"
};
