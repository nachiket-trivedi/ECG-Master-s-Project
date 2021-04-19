import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";
import LoginRegister from "../../Components/Modals/LoginRegister";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

    this.handleLoginRegisterModal = this.handleLoginRegisterModal.bind(this);
  }

  handleLoginRegisterModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false
    });
  };
  render() {
    let loginButton = null;
    if (localStorage.getItem("email") == null) {
      loginButton = (
        <Button variant="danger" onClick={this.handleLoginRegisterModal}>
          <h5>Sign In</h5>
        </Button>
      );
    }

    if (
      localStorage.getItem("role") == "patient" &&
      (localStorage.getItem("medicalFlag") == 0 ||
        localStorage.getItem("medicalFlag") == "false")
    ) {
      return <Redirect to="/completeMedicalProfile" />;
    }

    return (
      <div>
        <div className={styles.imageheader}></div>
        <br />
        <Row>
          <div sm={7} className={styles.infoBox}>
            <br />
            <div className={styles.infoTextHeading}>
              <h2>About Us</h2>
              <br />
              <div className={styles.infoTextList}>
                <h4> Your one-stop application to get ECG insights. </h4>
                <h4>
                  Get real-time ECG Analysis from ECG reports. The application
                  supports portable ECG devices like Apple Watch.
                </h4>
                <h4>
                  {" "}
                  Interactive Dashboards to identify trends and keep track of
                  your history.{" "}
                </h4>
                <h4>
                  {" "}
                  Maintain your Profile and all your Medical Details at one
                  place
                </h4>
                <br />
              </div>
              {loginButton}
            </div>
          </div>
        </Row>
        <br />
        <LoginRegister
          isModalOpen={this.state.isModalOpen}
          closeModal={this.handleClose}
        />
      </div>
    );
  }
}

export default Landing;
