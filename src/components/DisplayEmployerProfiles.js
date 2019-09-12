import React from "react";
import axiosClient from "../axiosClient";
import SwipeCard from "./SwipeCard";
import { Card, Container, Button } from "react-bootstrap";
import Swipeable from "react-swipy";
import DefaultPicture from "./default.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  appStyles,
  imgStyle,
  cardStyle,
  wrapperStyles,
  actionsStyles
} from "./swipeStyling";

class DisplayEmployerProfiles extends React.Component {
  state = {
    profiles: [],
    myProfileId: null
  };

  componentDidMount = () => {
    console.log("user id is " + sessionStorage.getItem("user_id"));
    console.log("profile id is " + sessionStorage.getItem("profile_id"));
    this.setState({ myProfileId: sessionStorage.getItem("profile_id") }, () => {
      console.log("profile id in the state is " + this.state.myProfileId);
    });

    axiosClient.get("/employers").then(response => {
      this.setState({ profiles: response.data.reverse() });
    });
  };

  // componentDidMount = () => {
  //   console.log("user id is " + sessionStorage.getItem("user_id"));
  //   console.log("profile id is " + sessionStorage.getItem("profile_id"));
  //   axiosClient.get("/employers").then(response => {
  //     this.setState({ profiles: response.data.reverse() });
  //     axiosClient
  //       .get("/api/profiles/" + sessionStorage.getItem("user_id"))
  //       .then(response => {
  //         console.log(response);
  //         if (response.data.length > 0) {
  //           this.setState({ myProfileId: response.data[0].id });
  //         } else {
  //           console.log("error please refresh the page");
  //         }
  //       });
  //   });
  // };

  handleSwipe = dir => {
    console.log(dir);
    if (dir === "left") {
      this.handleLeft();
    } else {
      this.handleRight();
    }
  };

  handleRight = () => {
    let swipedProfile = this.state.profiles[0];
    console.log(swipedProfile);
    let data = {
      accepted_employers: swipedProfile.id,
      id: sessionStorage.getItem("user_id")
    };
    axiosClient.patch("/users/update_matches", data);
    toast.success(`You liked ${swipedProfile.first_name}💖`);
    if (this.state.myProfileId) {
      if (
        swipedProfile.accepted_profiles.includes(
          this.state.myProfileId.toString()
        )
      ) {
        toast(
          `${swipedProfile.first_name} likes you back! Go to your matches to contact them.`
        );
      }
    }
  };

  handleLeft = () => {
    let swipedProfile = this.state.profiles[0];
    console.log(swipedProfile);
    let data = {
      rejected_employers: swipedProfile.id,
      id: sessionStorage.getItem("user_id")
    };
    axiosClient.patch("/users/update_matches", data);
    toast.warn(`You ghosted ${swipedProfile.first_name}👻`);
  };

  remove = () => {
    this.setState(({ profiles }) => ({
      profiles: profiles.slice(1, profiles.length)
    }));
  };

  showImg = (profileIndex, profiles) => {
    if (profiles[profileIndex].image_photos[0]) {
      return this.tidyImgUrl(profiles[profileIndex].image_photos[0].url);
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

  render() {
    const { profiles } = this.state;
    return (
      <Container style={{ paddingTop: "300px", paddingBottom: "300px" }}>
        <ToastContainer
          position="top-center"
          hideProgressBar
          autoClose={1000}
        />
        <div style={appStyles}>
          <div style={wrapperStyles}>
            {profiles.length > 0 && (
              <div style={wrapperStyles}>
                <Swipeable
                  buttons={({ right, left }) => (
                    <div style={actionsStyles}>
                      <Button
                        style={{
                          height: "70px",
                          width: "70px",
                          borderRadius: "50px",
                          border: "5px solid #D3D3D3",
                          backgroundColor: "white",
                          color: "black",
                          textAlign: "center"
                        }}
                        onClick={left}
                      >
                        ❌
                      </Button>
                      <Button
                        style={{
                          height: "70px",
                          width: "70px",
                          borderRadius: "50px",
                          border: "5px solid #D3D3D3",
                          backgroundColor: "white",
                          color: "black",
                          textAlign: "center"
                        }}
                        onClick={right}
                      >
                        ✅
                      </Button>
                    </div>
                  )}
                  onSwipe={dir => this.handleSwipe(dir)}
                  onAfterSwipe={this.remove}
                >
                  <SwipeCard>
                    <Card style={cardStyle}>
                      <Card.Img
                        style={imgStyle}
                        variant="top"
                        src={this.showImg(0, profiles)}
                        draggable={false}
                      />

                      <Card.Body>
                        <Card.Title>{profiles[0].company_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {profiles[0].first_name} {profiles[0].last_name}
                        </Card.Subtitle>
                        {profiles[0].bio}
                      </Card.Body>

                      <Card.Footer
                        style={{
                          textAlign: "center",
                          borderRadius: "0px 0px 25px 25px"
                        }}
                      >
                        <Card.Link
                          target="_blank"
                          href={
                            "https://www.google.com/maps/place/" +
                            profiles[0].location
                          }
                        >
                          📍{profiles[0].location}
                        </Card.Link>
                        <Card.Link
                          target="_blank"
                          href={profiles[0].company_url}
                        >
                          🔗 Website
                        </Card.Link>
                      </Card.Footer>
                    </Card>
                  </SwipeCard>
                </Swipeable>
                {profiles.length > 1 && (
                  <SwipeCard zIndex={-1}>
                    <Card style={cardStyle}>
                      <Card.Img
                        style={imgStyle}
                        variant="top"
                        src={this.showImg(1, profiles)}
                      />

                      <Card.Body>
                        <Card.Title>{profiles[1].company_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {profiles[1].first_name} {profiles[0].last_name}
                        </Card.Subtitle>
                        {profiles[1].bio}
                      </Card.Body>

                      <Card.Footer
                        style={{
                          textAlign: "center",
                          borderRadius: "0px 0px 25px 25px"
                        }}
                      >
                        <Card.Link
                          target="_blank"
                          href={
                            "https://www.google.com/maps/place/" +
                            profiles[1].location
                          }
                        >
                          📍{profiles[1].location}
                        </Card.Link>
                        <Card.Link
                          target="_blank"
                          href={profiles[1].company_url}
                        >
                          🔗 Website
                        </Card.Link>
                      </Card.Footer>
                    </Card>
                  </SwipeCard>
                )}
              </div>
            )}
            {profiles.length <= 1 && (
              <SwipeCard zIndex={-2}>
                <span>
                  No more profiles. Tell your mates to get on and use us!
                </span>
              </SwipeCard>
            )}
          </div>
        </div>
      </Container>
    );
  }
}

export default DisplayEmployerProfiles;
