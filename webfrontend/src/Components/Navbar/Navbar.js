import React from "react";
import styles from "../../Styles/styles.module.css";
import { Navbar, Button, Nav } from "react-bootstrap";
import LoginRegister from "../Modals/LoginRegister";

class HorizontalNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedOut: false,
      isModalOpen: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginRegisterModal = this.handleLoginRegisterModal.bind(this);
  }

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    this.setState({
      signedOut: true
    });
  };

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
    let navLogin = null;
    if (localStorage.getItem("role") != null) {
      console.log("Logged In");

      if (localStorage.getItem("role") == "patient") {
        console.log("Able to login to patient ");
        navLogin = (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/analyze">ECG Analysis</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
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
              <Button variant="danger" onClick={this.handleLogout}>
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
              <Nav.Link href="/adminDashboard">Dashboard</Nav.Link>
            </Nav>
            <Nav className="mr-sm-2">
              <Nav.Link href="/adminProfile">
                Hello!{" "}
                <b>
                  {localStorage.getItem("firstName") +
                    " " +
                    localStorage.getItem("lastName")}
                </b>
              </Nav.Link>
              <Button variant="danger" onClick={this.handleLogout}>
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
            <Button variant="danger" onClick={this.handleLoginRegisterModal}>
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
        <LoginRegister
          isModalOpen={this.state.isModalOpen}
          closeModal={this.handleClose}
        />
      </Navbar>
    );
  }
}

export default HorizontalNav;
