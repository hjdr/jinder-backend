import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router-dom";


class SignUp extends React.Component {
  state = {
    fireRedirect: false,
    email: null,
    password: null,
    passwordConfirmation: null
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createUser(this.state);
    this.setState({ email: null });
    this.setState({ password: null });
    this.setState({ passwordConfirmation: null });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }
  
  render() {


    return (
        <Container>
          <Row className="justify-content-center">
            <Card style={{ width: "26rem", marginTop: "2em" }}>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={this.handleChange}
                    />
                    <Form.Text className="text-muted">
                     We'll never share your email with anyone else ;)
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPasswordConfirmation">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      name="passwordConfirmation"
                      type="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
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

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default SignUp;
