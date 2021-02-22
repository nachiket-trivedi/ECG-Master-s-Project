import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import MedicalProfile from "../../Components/Profile/MedicalProfile";
import PersonalProfile from "../../Components/Profile/PersonalProfile";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let medProfileDetails = null;

    if (localStorage.getItem("email") == null) {
      return <Redirect to="/" />;
    }

    if (localStorage.getItem("role") != "admin") {
      medProfileDetails = (
        <Jumbotron>
          <MedicalProfile />
        </Jumbotron>
      );
    }

    return (
      <div className={styles.profilebg}>
        <Container className = {styles.whiteBox}>
          <br></br>
          <br></br>
          <Jumbotron>
            <PersonalProfile />
          </Jumbotron>
          <hr></hr>
          <br></br>
          {medProfileDetails}
          <br></br>
          <br></br>
        </Container>
      </div>
    );
  }
}

export default Profile;
