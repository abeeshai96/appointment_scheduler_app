import React, { useState } from "react";
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

import EditAppt from "../../containers/EditAppt/EditAppt";
import DeleteAppt from "../../containers/DeleteAppt/DeleteAppt";
import ModalAlert from "../../components/Modals/ModalAlert";

const CalendarView = (props) => {
  const [currentView, setCurrentView] = useState("work-week");
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [dlt, setDlt] = useState(false);
  const [deleteData, setDeleteData] = useState();

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

  const Header = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Header
      {...restProps}
      onOpenButtonClick={() => apptEditHandler(appointmentData)}
      onDeleteButtonClick={() => apptDeleteHandler(appointmentData)}
      showCloseButton
      showOpenButton
      showDeleteButton
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
    <Paper>
      <Scheduler data={props.apptData} height={660}>
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
        <AppointmentTooltip headerComponent={Header} />
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
  );
};

export default CalendarView;
