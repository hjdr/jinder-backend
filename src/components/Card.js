import React from "react";
import { Card } from "react-bootstrap";

const cardStyles = {
  background: "whitesmoke",
  borderRadius: 3,
  width: "250px",
  height: "350px",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  top: 0
};

const Card = ({ zIndex = 0, children }) => (
  <div style={{ ...cardStyles, zIndex }}>{children}</div>
);

export default Card;
