import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import FormikForm from "../FormikForm/FormikForm";

const ModalView = (props) => {
  const [show, setShow] = useState(true);
  const [passParm, setPassParm] = useState(true);
  const [formSubmit, setFormSubmit] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPassParm(false);
  };

  const formSubmitHandler = () => {
    setPassParm(true);
    setFormSubmit(true);
    // setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xxxl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modalMode}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormikForm
            data={props.data}
            editMode={props.editMode}
            formSubStat={passParm ? formSubmit : false}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="shadow-none"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outline-primary"
            className="shadow-none"
            onClick={formSubmitHandler}
          >
            {props.btnMode}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalView;
