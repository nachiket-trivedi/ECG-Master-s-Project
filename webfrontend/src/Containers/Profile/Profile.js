import React from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import MedicalProfile from "../../Components/Profile/MedicalProfile";
import PersonalProfile from "../../Components/Profile/PersonalProfile";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import femaleImage from "../../Styles/female.png";
import maleImage from "../../Styles/male.png";
import axios from "axios";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userId"),
      ecgCount: 0,
      date: ""
    };
  }

  componentWillMount = async () => {
    if (this.state.userId) {
      axios.defaults.withCredentials = true;
      axios
        .get(
          hostAddress + "/patientDashboard/ecgProfile/" + this.state.userId,
          config
        )
        .then(response => {
          console.log(response);

          var date = new Date(response.data.date).toUTCString();
          var dateDataArray = date.split(" ");
          var displayDate = `${dateDataArray[2]} ${dateDataArray[1]}, ${dateDataArray[3]}`;

          this.setState({
            ecgCount: response.data.count,
            date: displayDate
          });
        });
    }
  };

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
      <div className={styles.colorbg}>
        <br />
        <div className={styles.whiteBox}>
          <Row>
            <span className={styles.padded}>
              <center>
                <div>
                  <img className={styles.user} src={image} alt="userProfile" />
                </div>
                <br />
                <div>
                  <b>
                    <h5 className={styles.profileText}>ECG Reports Uploaded</h5>
                    <h3 className={styles.profileTextNumbers}>
                      {this.state.ecgCount}
                    </h3>
                    <br />
                    <br />
                    <h5 className={styles.profileText}>Last ECG Analysed</h5>
                    <h3 className={styles.profileTextNumbers}>
                      {this.state.date}{" "}
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
