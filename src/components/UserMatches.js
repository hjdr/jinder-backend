import React from "react";
import axiosClient from "../axiosClient";
import { Card, Container, Row, CardDeck } from "react-bootstrap";
import NoMatches from "./NoMatches";
import globalUrl from "../globalUrl";
import DefaultPicture from "./default.jpeg";
import { imgStyle, cardStyle } from "./swipeStyling";

class UserMatches extends React.Component {
  state = {
    matches: []
  };
  componentDidMount() {
    let current_user_id = sessionStorage.getItem("user_id");
    console.log("current user id is " + current_user_id);
    Promise.all([
      axiosClient.get("/api/profiles/" + current_user_id),
      axiosClient.get("/employers")
    ]).then(response => this.findMatches(response));
  }

  findMatches = response => {
    let current_user_id = sessionStorage.getItem("user_id");
    if (current_user_id === null) {
      return;
    }
    let profile_id = response[0].data[0].id;
    let employerIdsTheyLike = response[0].data[0].user.accepted_employers.map(
      str => parseInt(str, 10)
    );
    let allEmployers = response[1].data;
    let employersTheyLike = allEmployers.filter(employer =>
      employerIdsTheyLike.includes(employer.id)
    );
    let matches = employersTheyLike.filter(employer =>
      employer.accepted_profiles.includes(profile_id.toString())
    );
    this.setState({ matches: matches });
  };

  showImg = profile => {
    if (profile.image_photos[0]) {
      return globalUrl + profile.image_photos[0].url;
    } else {
      return DefaultPicture;
    }
  };

  renderMatch = match => {
    return (
      <Card style={cardStyle} key={match.id}>
        <Card.Img
          style={imgStyle}
          variant="top"
          src={this.showImg(match)}
          draggable={false}
        />
        <Card.Body>
          <Card.Title>
            {match.first_name} {match.last_name} likes you back!
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {match.first_name} {match.last_name}
          </Card.Subtitle>
          <p>Bio: {match.bio}</p>
          <p>Website: {match.company_url}</p>
          <p>Contact them at {match.email}</p>
        </Card.Body>
      </Card>
    );
  };
  render() {
    let noMatches;
    let matches;

    if (this.state.matches.length === 0) {
      noMatches = <NoMatches></NoMatches>;
    } else {
      matches = (
        <Container>
          <Row
            className="justify-content-center"
            style={{ paddingTop: "20px" }}
          >
            <CardDeck>
              {this.state.matches.map(match => this.renderMatch(match))}
            </CardDeck>
          </Row>
        </Container>
      );
    }

    return (
      <>
        {noMatches}
        {matches}
      </>
    );
  }
}

export default UserMatches;
