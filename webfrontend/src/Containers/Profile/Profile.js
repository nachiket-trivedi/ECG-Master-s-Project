import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import MedicalProfile from "../../Components/Profile/MedicalProfile";
import PersonalProfile from "../../Components/Profile/PersonalProfile";

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let medProfileDetails = null;
    if (localStorage.getItem("role") != "admin") {
      medProfileDetails = (
        <Jumbotron>
          <MedicalProfile />
        </Jumbotron>
      );
    }

    return (
      <Container>
        <br></br>
        <Jumbotron>
          <PersonalProfile />
        </Jumbotron>
        <hr></hr>
        <br></br>
        {medProfileDetails}
      </Container>
    );
  }
}

export default Landing;
