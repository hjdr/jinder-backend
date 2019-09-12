import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "../style/images/road.jpg";
import { Card, Button, Row, Container, Col } from "react-bootstrap";
import Typist from 'react-typist';
import '../style/css/Typist.css'

export default class Homepage extends Component {
  render() {
    return (
      <div style={containerPrimary}>
        <Container>
          <Row style={RowStyle}>
            <Col style={colStyle}>
              <Container style={TypistCtr}>
                  <Typist avgTypingDelay={120}>
                    <span>Your</span>
                    <br />
                    <span>Journey</span>
                    <br />
                    <span>Starts</span>
                    <br />
                    <span>Here.</span>
                  </Typist>
                </Container>
            </Col>
            <Col style={colStyle}>
            <Card style={cardStyle}>
                <Card.Header style={cardHeaderStyle} as="h5">
                  Who are you?
                </Card.Header>
                <Card.Body>
                  <Card.Text style={cardFontStyle}>
                    I am a candidate looking for the perfect employer.
                  </Card.Text>
                  <Button style={buttonStyle} href="candidate-sign-up">
                    Candidate
                  </Button>
                  <br />
                  <Card.Text style={cardFontStyle}>
                    I am an employer looking for the perfect candidate.
                  </Card.Text>
                  <Button style={buttonStyle} href="employer-sign-up">
                    Employer
                  </Button>
                </Card.Body>
                <Card.Footer style={footerStyle}>
                  <Card.Link style={linkStyle} href="/login-direction">
                    Got an account? Sign in here
                  </Card.Link>
                </Card.Footer>
              </Card>
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
  backgroundRepeat: "no-repeat",
  height: "100%",
  backgroundAttachment: "fixed",
  position: "center",
  paddingBottom: "450px",
  paddingTop: "100px"
};

const RowStyle = {
  height: "100%",

};

const cardStyle = {
  width: "18rem",
  textAlign: "center",
  border: "none",
  margin: "auto",
  marginTop: "150px",
  backgroundColor: "#FFFFFF99"
};

const cardHeaderStyle = {
  background: "#FF5903",
  color: "#fff"
};

const buttonStyle = {
  background: "#FF5903",
  border: "none",
  margin: "10px"
};

const linkStyle = {
  fontSize: 13
};

const colStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
};

const TypistCtr = {
  paddingTop: "90px",
  paddingLeft: "50px",
  alignItems: "center",
  fontSize: 85,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'left',
}

const footerStyle = {
  backgroundColor: "#C0C0C0"
};

const cardFontStyle = {
  fontWeight: "bold"
};
