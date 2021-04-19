import React from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import MedicalProfile from "../../Components/Profile/MedicalProfile";
import PersonalProfile from "../../Components/Profile/PersonalProfile";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import femaleImage from "../../Styles/female.png";
import maleImage from "../../Styles/male.png";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let medProfileDetails = null;
    let image = femaleImage;
    if (localStorage.getItem("email") == null) {
      return <Redirect to="/" />;
    }

    if (
      localStorage.getItem("role") == "patient" &&
      (localStorage.getItem("medicalFlag") == 0 ||
        localStorage.getItem("medicalFlag") == "false")
    ) {
      return <Redirect to="/completeMedicalProfile" />;
    }

    if (localStorage.getItem("role") != "admin") {
      medProfileDetails = (
        <Jumbotron>
          <MedicalProfile />
        </Jumbotron>
      );
    }

    if (localStorage.getItem("gender") == "female") {
      image = femaleImage;
    }

    return (
        <div className={styles.profileColorbg}>
          <br />
          <div className={styles.whiteBox}>
            <Row>
              <span className={styles.padded}>
                <center>
                  <div>
                    <img
                      className={styles.user}
                      src={image}
                      alt="userProfile"
                    />
                  </div>
                  <br />
                  <div>
                    <b>
                      <h5 className={styles.profileText}>
                        ECG Reports Uploaded
                      </h5>
                      <h3 className={styles.profileTextNumbers}>7</h3>
                      <br />
                      <br />
                      <h5 className={styles.profileText}>Last ECG Analysed</h5>
                      <h3 className={styles.profileTextNumbers}>
                        Feb 2, 2021{" "}
                      </h3>
                    </b>
                  </div>
                </center>
              </span>
              <Col>
                <br />
                <br />
                <Jumbotron>
                  <PersonalProfile />
                </Jumbotron>
                <hr />
                <br />
                {medProfileDetails}
              </Col>
            </Row>
          </div>
          <br />
        </div>
    );
  }
}

export default Profile;
