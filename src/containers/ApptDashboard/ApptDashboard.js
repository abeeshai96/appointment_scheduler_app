import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CreateAppt from "../../containers/CreateAppt/CreateAppt";
import CalendarView from "../../components/CalendarView/CalendarView";

const ApptDashboard = () => {
  const [btnClicked, setBtnClicked] = useState(false);

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
          Schedule Appointment
        </Button>
        {btnClicked ? <CreateAppt /> : null}
      </Container>
      <Container className="mb-3 mt-3">
        <CalendarView />
      </Container>
      <Footer />
    </>
  );
};

export default ApptDashboard;
