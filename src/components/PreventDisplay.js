import React from "react";
import { Button, Card, Row, Container, Col } from "react-bootstrap";
import background from "../style/images/beaver.jpeg";

export default class PreventDisplay extends React.Component {
  render() {
    return (
      <div style={containerPrimary}>
        <Container>
          <Row style={RowStyle}>
            <Col style={colStyle}>
              <Card style={cardStyle}>
                <Card.Header style={cardHeaderStyle} as="h5">
                  Hey, slow down eager beaver!
                </Card.Header>
                <Card.Body>
                  <Card.Text style={cardFontStyle}>
                    You must log in before you can start viewing beautiful
                    profiles
                  </Card.Text>
                  <Button style={buttonStyle} href="/">
                    Sign Up
                  </Button>
                  <br></br>
                </Card.Body>
                <Card.Footer style={footerStyle}>
                  <Card.Link style={linkStyle} href="/">
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
  paddingBottom: "600px"
};

const RowStyle = {
  height: "100%"
};

const cardStyle = {
  width: "18rem",
  textAlign: "center",
  border: "none",
  margin: "auto",
  marginTop: "250px",
  backgroundColor: "#FFFFFF99"
};

const cardHeaderStyle = {
  background: "#FF5903",
  color: "#fff"
};

const buttonStyle = {
  background: "#FF5903",
  border: "none",
  marginBottom: "10px"
};

const linkStyle = {
  fontSize: 13
};

const colStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
};

const footerStyle = {
  backgroundColor: "#C0C0C0"
};

const cardFontStyle = {
  fontWeight: "bold"
};
