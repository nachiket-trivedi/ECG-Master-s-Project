import React from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import MedicalProfile from "../../Components/Profile/MedicalProfile";
import PersonalProfile from "../../Components/Profile/PersonalProfile";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import femaleImage from "../../Styles/female.png";
import maleImage from "../../Styles/male.png";

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let medProfileDetails = null;
    let image = femaleImage;

    if (localStorage.getItem("email") == null) {
      return <Redirect to="/" />;
    }

    if (localStorage.getItem("role") == "patient") {
      return <Redirect to="/" />;
    }

    if (localStorage.getItem("gender") == "female") {
      image = femaleImage;
    }

    return (
      <div className={styles.adminProfileColorbg}>
        <br />
        <div className={styles.whiteBox}>
          <Row>
            <span className={styles.padded}>
              <center>
                <br />
                <br />
                <div>
                  <b>
                    <h3 className={styles.profileTextNumbers}>Admin User</h3>
                  </b>
                </div>
                <div>
                  <img className={styles.user} src={image} alt="userProfile" />
                </div>
                <br />
              </center>
            </span>
            <Col>
              <br />
              <br />
              <Jumbotron>
                <PersonalProfile />
              </Jumbotron>
            </Col>
          </Row>
        </div>
        <br />
      </div>
    );
  }
}

export default AdminProfile;
