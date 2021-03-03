import React from "react";

import ModalView from "../../components/Modals/ModalView";

const EditAppt = (props) => {
  return (
    <>
      <ModalView
        modalMode="Edit Appointment"
        btnMode="Update"
        data={props.data}
        editMode
      />
    </>
  );
};

export default EditAppt;
