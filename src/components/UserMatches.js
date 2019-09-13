import React from "react";
import axiosClient from "../axiosClient";
import { Card, Container, Row } from "react-bootstrap";
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

    if (response[0].data.length > 0) {
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
    } else {
      console.log(
        "profile could not be retrieved properly, showing you no matches by default"
      );
    }
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
            <Card.Subtitle className="mb-2 text-muted">
              {match.first_name} {match.last_name}
            </Card.Subtitle>
            {match.bio}
          </Card.Body>
          <Card.Footer style={{ textAlign: "center" }}>
            <Card.Link target="_blank" href={match.company_url}>
              🔗 Website
            </Card.Link>
            <Card.Link target="_blank" href={"mailto:" + match.email}>
              📧 Email{" "}
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

export default UserMatches;
