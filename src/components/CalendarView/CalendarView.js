import React, { useState, useEffect, useCallback } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  TodayButton,
  ViewSwitcher,
  MonthView,
  DayView,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "axios";
import { Button, Container } from "react-bootstrap";

import EditAppt from "../../containers/EditAppt/EditAppt";
import ModalAlert from "../../components/Modals/ModalAlert";

const CalendarView = (props) => {
  const [currentView, setCurrentView] = useState("work-week");
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [dlt, setDlt] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const [appts, setAppts] = useState();

  const fetchDataHandler = useCallback(() => {
    axios.get("/appointments").then((res) => {
      setAppts(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("Test Render");
    fetchDataHandler();
  }, [fetchDataHandler]);

  const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: "#FFC107",
        borderRadius: "8px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  const Content = ({ children, style, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      style={{
        ...style,
        backgroundColor: "#FCE397",
      }}
    >
      {children}
    </AppointmentTooltip.Content>
  );

  const Header = ({ children, style, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Header
      {...restProps}
      showCloseButton
      showOpenButton
      showDeleteButton
      onOpenButtonClick={() => apptEditHandler(appointmentData)}
      onDeleteButtonClick={() => apptDeleteHandler(appointmentData)}
      style={{
        ...style,
        backgroundColor: "#FFD557",
      }}
    >
      {children}
    </AppointmentTooltip.Header>
  );

  const apptEditHandler = (data) => {
    setEdit(!edit);
    setEditData(data);
  };
  const apptDeleteHandler = (data) => {
    setDlt(!dlt);
    setDeleteData(data.id);
  };

  return (
    <>
      <Container className="mb-3 d-flex justify-content-center">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={fetchDataHandler}
          className="shadow-none"
        >
          ⟳
        </Button>
      </Container>
      <Paper>
        <Scheduler data={appts} height={660}>
          <ViewState
            defaultCurrentDate={new Date()}
            currentViewName={currentView}
            onCurrentViewNameChange={setCurrentView}
          />
          <WeekView startDayHour={9} endDayHour={19} />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={6}
            endDayHour={22}
          />
          <MonthView />
          <DayView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
          />
          {edit ? <EditAppt data={editData} /> : null}
          {dlt ? (
            <ModalAlert
              msg="Do you want to delete?"
              btnName="Yes"
              data={deleteData}
              isSecAvl
            />
          ) : null}
        </Scheduler>
      </Paper>
    </>
  );
};

export default CalendarView;
