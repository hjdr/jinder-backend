import React from "react";
import axiosClient from "../axiosClient";
import { Card, Container, Row } from "react-bootstrap";
import NoMatches from "./NoMatches";
import globalUrl from "../globalUrl";
import DefaultPicture from "./default.jpeg";
import { imgStyle, cardStyle } from "./swipeStyling";

class EmployerMatches extends React.Component {
  state = {
    matches: []
  };
  componentDidMount() {
    let current_employer_id = sessionStorage.getItem("employer_id");
    Promise.all([
      axiosClient.get("/employers/" + current_employer_id),
      axiosClient.get("/api/profiles")
    ]).then(response => this.findMatches(response));
  }

  findMatches = response => {
    let current_employer_id = sessionStorage.getItem("employer_id");
    if (current_employer_id === null) {
      return;
    }
    let profileIdsTheyLike = response[0].data.accepted_profiles.map(str =>
      parseInt(str, 10)
    );
    let allProfiles = response[1].data;
    let profilesTheyLike = allProfiles.filter(profile =>
      profileIdsTheyLike.includes(profile.id)
    );
    let matches = profilesTheyLike.filter(profile =>
      profile.user.accepted_employers.includes(current_employer_id)
    );
    this.setState({ matches: matches });
  };

  showImg = profile => {
    if (profile.image_photos[0]) {
      return this.tidyImgUrl(profile.image_photos[0].url);
    } else {
      return DefaultPicture;
    }
  };

  tidyImgUrl = url => {
    return url.replace(
      "//s3.amazonaws.com/jinder-bucket/",
      "//jinder-bucket.s3.us-east-2.amazonaws.com/"
    );
  };

  renderMatch = match => {
    return (
      <div style={{ padding: "30px" }}>
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
            <Card.Subtitle>{match.industry}</Card.Subtitle>
            <span style={{ fontWeight: "600" }}>Skills </span>
            {match.skills.replace(/,/g, ", ")}
            <br />
            <span style={{ fontWeight: "600" }}>Traits </span>
            {match.personality.replace(/,/g, ", ")}
            <br />
            <span style={{ fontWeight: "600" }}>Bio </span>
            {match.user_bio}
            <br />
            <span style={{ fontWeight: "600" }}>Location </span>
            {match.location}
          </Card.Body>
          <Card.Footer style={{ textAlign: "center" }}>
            <Card.Link href={"mailto:" + match.user.email} target="_blank">
              📧 Email
            </Card.Link>
          </Card.Footer>
        </Card>
      </div>
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
            {this.state.matches.map(match => this.renderMatch(match))}
          </Row>
        </Container>
      );
    }
    return (
      <Container style={{ paddingTop: "300px", paddingBottom: "300px" }}>
        {noMatches}
        {matches}
      </Container>
    );
  }
}

export default EmployerMatches;
