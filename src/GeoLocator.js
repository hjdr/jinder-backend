import Geocode from "react-geocode";
// import api from "./secretapikey";
import api from "./publicapikey";
import { Card } from "react-bootstrap";
import SimpleMap from "./Map";
import React from "react";
import PropTypes from "prop-types";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(api);

class GeoLocator extends React.Component {
  state = {
    ready: false,
    locality: "",
    city: ""
  };

  findCity = pos => {
    Geocode.fromLatLng(pos.lat, pos.lng).then(
      response => {
        const locality = response.results[0].address_components[2].long_name;
        const city = response.results[0].address_components[3].long_name;
        console.log("in find city the response is ");
        console.log(response);
        this.setState({ locality: locality });
        this.setState({ city: city });
        this.setState({ ready: true });
        this.props.updateLocation(city);
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    let pleaseWait;
    let results;

    if (this.state.ready) {
      results = (
        <span>
          🤖 JinderBot has detected your location as {this.state.locality},{" "}
          {this.state.city}
        </span>
      );
    } else {
      pleaseWait = (
        <span>🤖 JinderBot is determining your location ... Please wait</span>
      );
    }

    return (
      <Card style={{ padding: "-25px 10px 0px 10px" }}>
        <SimpleMap findCity={this.findCity}></SimpleMap>
        <Card.Footer>
          {pleaseWait}
          {results}
        </Card.Footer>
      </Card>
    );
  }
}

SimpleMap.propTypes = {
  updateLocation: PropTypes.func.isRequired
};

export default GeoLocator;
