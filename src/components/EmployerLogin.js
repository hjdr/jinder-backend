import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class EmployerLogIn extends React.Component {
  state = {
    email: null,
    password: null
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createEmployerSession(this.state);
    this.setState({ email: null });
    this.setState({ password: null });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <Container style={{ paddingTop: "150px" }}>
        <Row className="justify-content-center">
          <Card style={{ width: "26rem", marginTop: "2em" }}>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ background: "#FF5903", border: "none" }}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

EmployerLogIn.propTypes = {
  createEmployerSession: PropTypes.func.isRequired
};

export default EmployerLogIn;
