import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Navbar, Nav } from "react-bootstrap";
import whiteLogo from "../style/images/jinder-flame-white.png";
import orangeLogo from "../style/images/jinder-flame-orange.png";
import globalUrl from "../globalUrl";

export default function Header() {
  // Navbar colour fade
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backgroundCol = navBackground ? "#FF5903" : "transparent";

  // Text colour fade
  const [navText, setNavText] = useState(false);
  const navColRef = useRef();
  navColRef.current = navText;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      if (navColRef.current !== show) {
        setNavText(show);
      }
    };
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navTextColor = navBackground ? "white" : "#FF5903";

  // Logo colour fade
  const [navLogo, setNavLogo] = useState(false);
  const navLogoColRef = useRef();
  navLogoColRef.current = navLogo;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 100;
      if (navLogoColRef.current !== show) {
        setNavLogo(show);
      }
    };
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLogoColor = navBackground ? whiteLogo : orangeLogo;

  const destroySession = () => {
    fetch(`${globalUrl}/api/sessions`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: sessionStorage.getItem("user_")
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(destroyUserId())
      .catch(error => console.error(error));
  };

  const destroyUserId = () => {
    sessionStorage.clear();
    this.props.destroyRedirects();
  };

  //Change colour of links based on href

  let linkColour;
  let logo;

  const linkColourChecker = () => {
    const pagesWithBackgrounds = [
      "",
      "about",
      "login-direction",
      "sign-up-direction",
      "login-or-sign-up"
    ];

    const currentPage = window.location.href.split("/").slice(-1)[0];

    if (pagesWithBackgrounds.includes(currentPage)) {
      linkColour = "white";
      logo = whiteLogo;
    } else {
      linkColour = navTextColor;
      logo = navLogoColor;
    }
  };

  linkColourChecker();

  let signIn;
  let signUp;
  let signOut;
  let yourProfile;
  let viewProfilesAsCandidate;
  let viewProfilesAsEmployer;
  let viewMatchesAsEmployer;
  let viewMatchesAsCandidate;

  if (
    sessionStorage.getItem("user_id") === null &&
    sessionStorage.getItem("employer_id") === null
  ) {
    signIn = (
      <Nav.Link
        style={{
          color: `${linkColour}`,
          paddingLeft: "0px",
          transition: "1s ease"
        }}
        href="/login-direction"
      >
        Sign In
      </Nav.Link>
    );
    signUp = (
      <Nav.Link
        style={{
          color: `${linkColour}`,
          paddingLeft: "0px",
          transition: "1s ease"
        }}
        href="/"
      >
        Sign Up
      </Nav.Link>
    );
  } else {
    signOut = (
      <Nav.Link
        onClick={destroySession}
        style={{
          color: `${linkColour}`,
          paddingLeft: "0px",
          transition: "1s ease"
        }}
        on
        href="/"
      >
        Sign Out
      </Nav.Link>
    );
  }

  if (sessionStorage.getItem("user_id") !== null) {
    viewProfilesAsCandidate = (
      <Nav.Link
        style={{ color: `${linkColour}`, transition: "1s ease" }}
        href="/employer-profiles"
      >
        View Employers
      </Nav.Link>
    );
    viewMatchesAsCandidate = (
      <Nav.Link
        style={{ color: `${linkColour}`, transition: "1s ease" }}
        href="/candidate-matches"
      >
        View Matches
      </Nav.Link>
    );
  }

  if (sessionStorage.getItem("employer_id") !== null) {
    viewProfilesAsEmployer = (
      <Nav.Link
        style={{ color: `${linkColour}`, transition: "1s ease" }}
        href="/candidate-profiles"
      >
        View Candidates
      </Nav.Link>
    );
    viewMatchesAsEmployer = (
      <Nav.Link
        style={{ color: `${linkColour}`, transition: "1s ease" }}
        href="/employer-matches"
      >
        View Matches
      </Nav.Link>
    );
  }

  return (
    <header style={headerStyle}>
      <Navbar
        expand="lg"
        style={{ backgroundColor: `${backgroundCol}`, transition: "1s ease" }}
      >
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="35"
            height="45"
            className="d-inline-block align-top"
            alt="Jinder"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              style={{ color: `${linkColour}`, transition: "1s ease" }}
              href="/"
            >
              Home
            </Nav.Link>
            {viewProfilesAsCandidate}
            {viewProfilesAsEmployer}
            {viewMatchesAsCandidate}
            {viewMatchesAsEmployer}

            {yourProfile}
            <Nav.Link
              style={{ color: `${linkColour}`, transition: "1s ease" }}
              href="/about"
            >
              About Us
            </Nav.Link>
          </Nav>
          {signIn}
          {signUp}
          {signOut}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

Header.propTypes = {
  destroyRedirects: PropTypes.func.isRequired
};

const headerStyle = {
  position: "fixed",
  width: "100%",
  zIndex: "5",
  top: 0
};
