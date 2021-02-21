import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./Containers/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}

export default App;
