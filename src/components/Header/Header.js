import React from "react";
import { Navbar, Image } from "react-bootstrap";

import apptLogo from "../../assets/images/appointment.png";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand>
        <Image alt="" src={apptLogo} width="40" height="40" rounded />
      </Navbar.Brand>
      <Navbar.Brand>Appointment Scheduler</Navbar.Brand>
    </Navbar>
  );
};

export default Header;
