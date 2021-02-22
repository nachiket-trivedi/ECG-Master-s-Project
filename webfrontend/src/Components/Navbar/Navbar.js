import React from "react";
import styles from "../../Styles/styles.module.css";
import {
  Navbar,
  Button,
  Nav,
  Modal,
  Row,
  Col,
  FormControl,
  InputGroup,
  Form,
  Image,
  Input
} from "react-bootstrap";
import axios from "axios";
import { backendIp, backendPort } from "../../config";

const hostAddress = `${backendIp}:${backendPort}`;

const registrationLinkText = "Not yet Registered? ";
const loginLinkText = "Already a member? ";

class HorizontalNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false,
      isModalOpen: false,
      loginModalFlag: false,
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      registerFirstName: "",
      registerLastName: "",
      registerContact: "",
      registerAddress1: "",
      registerAddress2: "",
      registerCity: "",
      registerState: "",
      registerZipcode: "",
      registerCountry: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.handleLoginModal = this.handleLoginModal.bind(this);
    this.handleRegisterModal = this.handleRegisterModal.bind(this);
  }

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    this.setState({
      signedOut: true
    });
  };

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginModal = () => {
    this.setState({
      loginModalFlag: true,
      isModalOpen: true
    });
  };

  handleRegisterModal = () => {
    this.setState({
      loginModalFlag: false
    });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false
    });
  };

  registerPatient = e => {
    //Backend call to Register
    e.preventDefault();
    const data = {
      email: this.state.registerEmail,
      password: this.state.registerPassword,
      firstName: this.state.registerFirstName,
      lastName: this.state.registerLastName,
      contact: this.state.registerContact,
      addressLine1: this.state.registerAddress1,
      addressLine2: this.state.registerAddress2,
      city: this.state.registerCity,
      state: this.state.registerState,
      zipcode: this.state.registerZipcode,
      country: this.state.registerCountry
    };

    axios.defaults.withCredentials = true;
    axios
      .post(hostAddress + "/register/patient", data)
      .then(response => {
        console.log(response.data);
        alert("Registered Successfully");
        if (response.status == 200) {
          console.log("Response data after register post-->" + response.data);
          localStorage.setItem("role", response.data["role"]);
          localStorage.setItem("email", response.data["email"]);
          localStorage.setItem("firstName", response.data["firstName"]);
          localStorage.setItem("lastName", response.data["lastName"]);
          localStorage.setItem("medicalFlag", response.data["medicalFlag"]);
          localStorage.setItem("jwtToken", response.data.token);
        } else {
          window.alert("Error Connecting to Server");
        }
        window.location.reload();
        this.setState({
          isModalOpen: false
        });
      })
      .catch(err => {
        console.log("Invalid-in catch");
      });
  };

  loginPatient = e => {
    //Backend call to login
    e.preventDefault();
    const data = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    };
    axios.defaults.withCredentials = true;
    axios
      .post(hostAddress + "/login", data)
      .then(response => {
        console.log(response.data);
        alert("Logged In Successfully");
        if (response.status == 200) {
          console.log("Response data after login post-->" + response.data);
          localStorage.setItem("role", response.data["role"]);
          localStorage.setItem("email", response.data["email"]);
          localStorage.setItem("firstName", response.data["firstName"]);
          localStorage.setItem("lastName", response.data["lastName"]);
          localStorage.setItem("medicalFlag", response.data["medicalFlag"]);
          localStorage.setItem("jwtToken", response.data.token);
        } else if (response.status == 205) {
          window.alert("Invalid Credentials!");
        } else {
          window.alert("Error Connecting to Server");
        }
        window.location.reload();
        this.setState({
          isModalOpen: false
        });
      })
      .catch(err => {
        console.log("Invalid-in catch");
      });
  };

  render() {
    let navLogin = null;
    let modalContent = null;
    let modalTitle = "";

    if (this.state.loginModalFlag) {
      modalTitle = "Sign In";
      modalContent = (
        <Form>
          <Form.Group controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="loginEmail"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="loginPassword"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text className={styles.formText}>
              {registrationLinkText}
              <a
                onClick={this.handleRegisterModal}
                className={styles.formLinkText}
              >
                Register Now!
              </a>
            </Form.Text>
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className={styles.formButton}
            onClick={this.loginPatient}
          >
            Sign In
          </Button>
        </Form>
      );
    } else {
      modalTitle = "Register";
      modalContent = (
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="registerEmail"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="registerEmail"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="registerFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="registerFirstName"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="registerLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="registerLastName"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="registerContact">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="6695657890"
                name="registerContact"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="registerCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="USA"
                name="registerCountry"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="registerAddress1">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              name="registerAddress1"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Group controlId="registerAddress2">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              name="registerAddress2"
              onChange={this.inputChangeHandler}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="registerCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="San Jose"
                name="registerCity"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="registerState">
              <Form.Label>State</Form.Label>
              <Form.Control
                placeholder="California"
                name="registerState"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="registerZipcode">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="number"
                placeholder="95126"
                name="registerZipcode"
                onChange={this.inputChangeHandler}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Text className={styles.formText}>
              {loginLinkText}
              <a
                onClick={this.handleLoginModal}
                className={styles.formLinkText}
              >
                Sign In!
              </a>
            </Form.Text>
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className={styles.formButton}
            onClick={this.registerPatient}
          >
            Register
          </Button>
        </Form>
      );
    }

    if (localStorage.getItem("role") != null) {
      console.log("Logged In");

      if (localStorage.getItem("role") == "patient") {
        console.log("Able to login to patient ");
        navLogin = (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/browse">ECG Analysis</Nav.Link>
              <Nav.Link href="/browse">Dashboard</Nav.Link>
            </Nav>
            <Nav className="mr-sm-2">
              <Nav.Link href="/profile">
                Hello!{" "}
                <b>
                  {localStorage.getItem("firstName") +
                    " " +
                    localStorage.getItem("lastName")}
                </b>
              </Nav.Link>
              <Button variant="outline-danger" onClick={this.handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        );
      } else if (localStorage.getItem("role") == "admin") {
        console.log("Able to login to admin ");
        navLogin = (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/browse">Dashboard</Nav.Link>
            </Nav>
            <Nav className="mr-sm-2">
              <Nav.Link href="/profile">
                Hello!{" "}
                <b>
                  {localStorage.getItem("firstName") +
                    " " +
                    localStorage.getItem("lastName")}
                </b>
              </Nav.Link>
              <Button variant="outline-danger" onClick={this.handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        );
      }
    } else {
      navLogin = (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav className="mr-sm-2">
            <Button variant="outline-danger" onClick={this.handleLoginModal}>
              Sign In
            </Button>
          </Nav>
        </Navbar.Collapse>
      );
    }

    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand
          href="/"
          className="fa fa-heartbeat"
          style={{
            marginRight: "2ch",
            fontSize: "1.8rem",
            color: "white"
          }}
        ></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {navLogin}
        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>
                <b>{modalTitle}</b>
              </h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
        </Modal>
      </Navbar>
    );
  }
}

export default HorizontalNav;
