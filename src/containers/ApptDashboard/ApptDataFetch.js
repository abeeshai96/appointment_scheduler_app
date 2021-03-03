import React, { useState, useEffect } from "react";
import axios from "axios";

import CalendarView from "../../components/CalendarView/CalendarView";

const ApptDataFetch = () => {
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    axios.get("/appointments").then((res) => {
      setAppts(res.data);
    });
  }, []);

  return (
    <>
      <CalendarView apptData={appts} />
    </>
  );
};

export default ApptDataFetch;
