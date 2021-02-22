import React from "react";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (localStorage.getItem("medicalFlag") == 0 || localStorage.getItem("medicalFlag") == "false" ) {
      return <Redirect to="/profile" />;
    }

    return (
      <Container>
        <h2>Landing Page Content</h2>
      </Container>
    );
  }
}

export default Landing;
