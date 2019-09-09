import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Card, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ImageUpload from "./ImageUpload";

class EmployerProfile extends React.Component {
  state = {
    // for routing
    fireRedirect: false,

    //for profile details
    firstName: null,
    surname: null,
    bio: null,
    companyUrl: null,
    urlInvalid: null,

    // for image upload

    images: [],
    imageNeedsChecking: false
  };

  componentDidMount = () => {
    console.log(
      "you used the email " + sessionStorage.getItem("employer_email")
    );
    console.log(
      "you used the password " + sessionStorage.getItem("employer_password")
    );
  };

  handleSubmit = event => {
    if (this.state.urlInvalid) {
      event.preventDefault();
      return;
    }

    if (this.state.imageNeedsChecking) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    this.props.createEmployerProfile(this.state);
    this.setState({ firstName: null });
    this.setState({ surname: null });
    this.setState({ bio: null });
    this.setState({ companyUrl: null });
    this.setState({ images: [] });
    this.setState({ fireRedirect: true });
  };

  handleFieldChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    if (target.name === "companyUrl") {
      if (this.isUrlValid(target.value)) {
        this.setState({ urlInvalid: false });
      } else {
        this.setState({ urlInvalid: true });
      }
    }
  };

  isUrlValid = userInput => {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  };

  updateImages = images => {
    this.setState({ images: images });
  };

  updateImageCheckStatus = status => {
    this.setState({ imageNeedsChecking: status });
  };

  clearPhotos = () => {
    sessionStorage.setItem("employer_first_name", this.state.firstName);
    sessionStorage.setItem("employer_surname", this.state.surname);
    sessionStorage.setItem("employer_bio", this.state.bio);
    sessionStorage.setItem("employer_website", this.state.companyUrl);

    console.log("now in employer profile clearing photos");
    window.location.reload();
  };

  render() {
    const { fireRedirect } = this.state;

    return (
      <Container>
        <Row className="justify-content-center">
          <Card style={{ width: "26rem", marginTop: "2em" }}>
            <Card.Body>
              <p style={welcomeMessage}>
                Hey hot stuff. Start courting the market right away by filling
                in your details below...
              </p>

              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    defaultValue={sessionStorage.getItem("employer_first_name")}
                    onChange={this.handleFieldChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                  <Form.Label>Surname:</Form.Label>
                  <Form.Control
                    type="text"
                    name="surname"
                    placeholder="Enter your surname"
                    onChange={this.handleFieldChange}
                    required
                    defaultValue={sessionStorage.getItem("employer_surname")}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicBio">
                  <Form.Label>Company Bio:</Form.Label>
                  <Form.Control
                    type="text"
                    name="bio"
                    placeholder="Enter your company bio"
                    onChange={this.handleFieldChange}
                    required
                    defaultValue={sessionStorage.getItem("employer_bio")}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCompanyUrl">
                  <Form.Label>Company Website:</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyUrl"
                    placeholder="Must be a valid url"
                    onChange={this.handleFieldChange}
                    required
                    isInvalid={this.state.urlInvalid}
                    defaultValue={sessionStorage.getItem("employer_website")}
                  />
                </Form.Group>

                <ImageUpload
                  updateImages={this.updateImages}
                  updateImageCheckStatus={this.updateImageCheckStatus}
                  clearPhotos={this.clearPhotos}
                  images={this.state.images}
                ></ImageUpload>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>

              {fireRedirect && <Redirect to="/candidate-profiles" />}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

EmployerProfile.propTypes = {
  createEmployerProfile: PropTypes.func.isRequired
};

const welcomeMessage = {
  color: "#FF5903",
  textAlign: "center",
  padding: "10px"
};

export default EmployerProfile;
