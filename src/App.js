import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import UserProfile from "./components/UserProfile";
import DisplayProfiles from "./components/DisplayProfiles";

class App extends React.Component {
  state = {};

  createUser = state => {
    fetch("https://jinder-backend.herokuapp.com/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: state.email,
          password: state.password
        }
      })
    });
  };

  createSession = state => {
    fetch("https://jinder-backend.herokuapp.com/api/sessions", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: state.email,
          password: state.password
        }
      })
    });
  };

  buildUserProfileFormData = state => {
    let formData = new FormData();
    formData.append("profile[first_name]", state.firstName);
    formData.append("profile[last_name]", state.surname);
    formData.append("profile[user_id]", 1);
    formData.append("profile[industry]", state.industry);
    formData.append("profile[skills]", state.skills);

    let images = state.images;
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append(
        `profile[images_attributes][${i}][photo]`,
        file,
        file.name
      );
    }

    return formData;
  };

  createProfile = state => {
    axios.post(
      "http://localhost:3000/api/profiles",
      this.buildUserProfileFormData(state),
      {
        headers: {
          "X-User-Token": "uBEf4-XyHQmyGRkK3hyu",
          "X-User-Email": "123456@123456"
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/profiles" component={DisplayProfiles} />
          <Route
            exact
            path="/"
            render={props => <SignUp {...props} createUser={this.createUser} />}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <LogIn {...props} createSession={this.createSession} />
            )}
          />
          <Route
            exact
            path="/profile"
            render={props => (
              <UserProfile {...props} createProfile={this.createProfile} />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
