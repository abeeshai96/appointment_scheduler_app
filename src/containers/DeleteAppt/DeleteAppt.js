import { useEffect } from "react";
import axios from "axios";

const DeleteAppt = (props) => {
  useEffect(() => {
    axios.delete(`/appointments/${props.data}`).then((res) => {
      console.log(res);
      alert("Appointment deleted");
    });
  }, [props.data]);

  return <></>;
};

export default DeleteAppt;
