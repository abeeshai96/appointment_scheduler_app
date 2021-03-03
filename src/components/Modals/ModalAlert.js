import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import DeleteAppt from "../../containers/DeleteAppt/DeleteAppt";

const ModalAlert = (props) => {
  const [show, setShow] = useState(true);
  const [modalSubmit, setModalSubmit] = useState(false);

  const handleClose = () => setShow(false);

  const modalSubmitHandler = () => {
    setModalSubmit(true);
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>{props.msg}</Modal.Body>
        <Modal.Footer className="p-1">
          {props.isSecAvl ? (
            <Button
              variant="outline-secondary"
              className="shadow-none"
              onClick={handleClose}
              size="sm"
            >
              No
            </Button>
          ) : null}
          <Button
            variant="outline-primary"
            className="shadow-none"
            onClick={modalSubmitHandler}
            size="sm"
          >
            {props.btnName}
          </Button>
        </Modal.Footer>
      </Modal>
      {modalSubmit ? <DeleteAppt data={props.data} /> : null}
    </>
  );
};

export default ModalAlert;
