import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import styles from "../../Styles/styles.module.css";

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if ( (localStorage.getItem("role") == "patient") && (localStorage.getItem("medicalFlag") == 0 || localStorage.getItem("medicalFlag") == "false")) {
      return <Redirect to="/completeMedicalProfile" />;
    }

    return (
      <div className={styles.imagebg}>
         <Row>
           <div sm={7} className={styles.centerText}>
          
           </div>
         </Row>
      </div>
    );
  }
}

export default Landing;
