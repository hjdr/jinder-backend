import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
// import api from "./secretapikey";
import api from "./publicapikey";
import PropTypes from "prop-types";
import MapPointer from "./map-pointer.png";

const AnyReactComponent = () => (
  <img style={pointerStyle} src={MapPointer}></img>
);

class SimpleMap extends Component {
  state = {
    lat: 51.5229,
    lng: 0.0777
  };

  componentDidMount = () => {
    this.getGeolocation();
  };

  getGeolocation = () => {
    let that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("in get geolocation the pos is");
        console.log(pos);
        that.setState({ lat: pos.lat });
        that.setState({ lng: pos.lng });
        that.props.findCity(pos);
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Geolcation not enabled");
    }
  };
  render() {
    let { lat } = this.state;
    let { lng } = this.state;

    return (
      <div
        style={{ height: "200px", width: "100%", padding: "10px 0px 10px 0px" }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: api }}
          center={{ lat: lat, lng: lng }}
          defaultZoom={12}
        >
          <AnyReactComponent lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

SimpleMap.propTypes = {
  findCity: PropTypes.func.isRequired
};

const pointerStyle = {
  height: "70px",
  width: "45px"
};

export default SimpleMap;
