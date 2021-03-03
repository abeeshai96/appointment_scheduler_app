import React from "react";
import { Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      sticky="top"
      className="justify-content-center"
    >
      <Navbar.Brand>© Appointment Scheduler 2021</Navbar.Brand>
    </Navbar>
  );
};

export default Footer;
