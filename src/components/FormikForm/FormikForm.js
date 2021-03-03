import React, { useState, useRef, useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import {
  MenuItem,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { TextField, Select, RadioGroup } from "formik-material-ui";
import { DateTimePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as Yup from "yup";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

import ModalAlert from "../../components/Modals/ModalAlert";

const FormikForm = (props) => {
  const { editMode, data, formSubStat } = props;
  const [changeFound, setChangeFound] = useState(false);

  const formRef = useRef();

  const btnHandler = useCallback(() => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  }, []);

  useEffect(() => {
    if (formSubStat) {
      btnHandler();
    }
  }, [btnHandler, formSubStat]);

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{
          apptName: editMode ? data.title : "",
          apptDesc: editMode ? data.desc : "",
          apptType: editMode ? data.type : "personal",
          apptPriority: editMode ? data.priority : "medium",
          apptStartDateTime: editMode ? data.startDate : null,
          apptEndDateTime: editMode ? data.endDate : null,
        }}
        validationSchema={Yup.object({
          apptName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          apptDesc: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
          apptType: Yup.string()
            .oneOf(["personal", "office"], "Invalid Appointment Type")
            .required("Required"),
          apptPriority: Yup.string()
            .oneOf(["high", "medium", "low"], "Invalid Appointment Priority")
            .required("Required"),
          apptStartDateTime: Yup.date().required("Required").nullable(),
          apptEndDateTime: Yup.date()
            .required("Required")
            .nullable()
            .min(
              Yup.ref("apptStartDateTime"),
              "End Time should be greater than Start Time"
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const result = {
              title: values.apptName,
              desc: values.apptDesc,
              type: values.apptType,
              priority: values.apptPriority,
              startDate: values.apptStartDateTime,
              endDate: values.apptEndDateTime,
            };

            if (editMode) {
              setChangeFound(false);
              if (
                values.apptName === data.title &&
                values.apptDesc === data.desc &&
                values.apptType === data.type &&
                values.apptPriority === data.priority &&
                values.apptStartDateTime === data.startDate &&
                values.apptEndDateTime === data.endDate
              ) {
                setChangeFound(true);
              } else {
                axios.put(`/appointments/${data.id}`, result).then((res) => {
                  console.log(res);
                  alert("Appointment updated");
                });
              }
            } else {
              axios.post("/appointments", result).then((res) => {
                console.log(res);
                alert("Appointment created");
              });
            }
            setSubmitting(false);
          }, 400);
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Form>
            <Container>
              <Row>
                <Col>
                  <Field
                    name="apptName"
                    component={TextField}
                    label="Name"
                    variant="outlined"
                    size="small"
                  />
                </Col>
                <Col>
                  <Field
                    name="apptDesc"
                    component={TextField}
                    label="Description"
                    variant="outlined"
                    size="small"
                  />
                </Col>
              </Row>
            </Container>
            <br />
            <Container>
              <Row>
                <Col>
                  <Field
                    name="apptStartDateTime"
                    component={DateTimePicker}
                    label="Start Time"
                    inputVariant="outlined"
                    disablePast
                    format="dd/MM/yyyy hh:mm a"
                    size="small"
                  />
                </Col>
                <Col>
                  <Field
                    name="apptEndDateTime"
                    component={DateTimePicker}
                    label="End Time"
                    inputVariant="outlined"
                    disablePast
                    format="dd/MM/yyyy hh:mm a"
                    size="small"
                  />
                </Col>
              </Row>
            </Container>
            <br />
            <Container>
              <Row>
                <Col>
                  <FormControl
                    fullWidth
                    size="small"
                    variant="outlined"
                    name="apptType"
                  >
                    <InputLabel variant="outlined">Type</InputLabel>
                    <Field
                      name="apptType"
                      component={Select}
                      variant="outlined"
                      label="Type"
                    >
                      <MenuItem value={"personal"}>Personal</MenuItem>
                      <MenuItem value={"office"}>Office</MenuItem>
                    </Field>
                  </FormControl>
                </Col>
                <Col>
                  <InputLabel>Priority</InputLabel>{" "}
                  <Field component={RadioGroup} name="apptPriority" row>
                    <FormControlLabel
                      value="high"
                      control={<Radio disabled={() => {}} />}
                      label="H"
                      disabled={() => {}}
                    />
                    <FormControlLabel
                      value="medium"
                      control={<Radio disabled={() => {}} />}
                      label="M"
                      disabled={() => {}}
                    />
                    <FormControlLabel
                      value="low"
                      control={<Radio disabled={() => {}} />}
                      label="L"
                      disabled={() => {}}
                    />
                  </Field>
                </Col>
              </Row>
            </Container>
            {changeFound ? (
              <ModalAlert msg="No changes found to update" btnName="Ok" />
            ) : null}
          </Form>
        </MuiPickersUtilsProvider>
      </Formik>
    </>
  );
};

export default FormikForm;
