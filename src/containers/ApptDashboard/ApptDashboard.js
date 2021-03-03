import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CalendarView from "../../components/CalendarView/CalendarView";
import CreateAppt from "../../containers/CreateAppt/CreateAppt";

const ApptDashboard = () => {
  const [appts, setAppts] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);

  useEffect(() => {
    axios.get("/appointments").then((res) => {
      setAppts(res.data);
    });
  }, []);

  const btnClickHandler = () => {
    setBtnClicked(!btnClicked);
  };

  return (
    <>
      <Header />
      <Container className="mb-3 mt-3 d-flex justify-content-center">
        <Button
          variant="outline-info"
          size="lg"
          onClick={btnClickHandler}
          className="shadow-none"
        >
          {`Current status: ${btnClicked ? "on" : "off"}`}
          Schedule Appointment
        </Button>
        {btnClicked ? <CreateAppt /> : null}
      </Container>
      <Container className="mb-3 mt-3">
        <CalendarView apptData={appts} />
      </Container>
      <Footer />
    </>
  );
};

export default ApptDashboard;
