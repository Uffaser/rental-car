import { Field, Form, Formik } from "formik";
import style from "./CarDetailsForm.module.css";

export default function CarDetailsForm() {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <fieldset className={style.carDetailsForm}>
          <p className={style.carDetailsTitle}>Book your car now</p>
          <p className={style.carDetailsSubtitle}>
            Stay connected! We are always ready to help you.
          </p>
          <Field
            className={style.carDetailsInput}
            type="text"
            name="name"
            placeholder="Name*"
          />
          <Field
            className={style.carDetailsInput}
            type="email"
            name="email"
            placeholder="Email*"
          />
          <Field
            className={style.carDetailsInput}
            type="text"
            name="date"
            placeholder="Booking date"
          />
          <Field
            className={style.carDetailsInput}
            as="textarea"
            name="comment"
            placeholder="Comment"
            rows="3"
          />
          <button className={style.carDetailsBtn} type="submit">
            Send
          </button>
        </fieldset>
      </Form>
    </Formik>
  );
}
