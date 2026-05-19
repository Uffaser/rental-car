import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import style from "./CarDetailsForm.module.css";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { postBookingCar } from "@/lib/api/clientApi";
import { NewBooking } from "@/types/car";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface DetailsFormValues {
  name: string;
  email: string;
  date?: string;
  comment?: string;
}

const initialValues: DetailsFormValues = {
  name: "",
  email: "",
  date: "",
  comment: "",
};

type Props = {
  id: string;
};

const ReadOnlyInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} readOnly className={style.input} />
);

const DetailsFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "The name must contain at least 1 character.")
    .max(96, "The name is too long.")
    .required("This field is required."),
  email: Yup.string().email().required("This field is required."),
  date: Yup.string()
    .trim()
    .notRequired()
    .test("is-valid-date", "Invalid date format.", (value) => {
      if (!value) return true;
      const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!isoRegex.test(value)) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    }),
  comment: Yup.string().max(1000, "The comment is too long."),
});

export default function CarDetailsForm({ id }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const mutation = useMutation({
    mutationFn: (values: NewBooking) => postBookingCar(id, values),
    onSuccess: (data) => {
      if (data?.message) {
        toast.success(data.message);
      }
    },
    onError: () => {
      toast.error("Error creating reservation. Please try again.");
    },
  });

  const handleSubmit = (
    values: DetailsFormValues,
    actions: FormikHelpers<DetailsFormValues>,
  ) => {
    const payload: NewBooking = { name: values.name, email: values.email };
    if (values.date) payload.date = values.date;
    if (values.comment) payload.comment = values.comment;

    mutation.mutate(payload, {
      onSuccess: () => {
        actions.resetForm();
        actions.setSubmitting(false);
      },
      onError: () => {
        actions.setSubmitting(false);
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DetailsFormSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <fieldset className={style.carDetailsForm}>
          <p className={style.carDetailsTitle}>Book your car now</p>
          <p className={style.carDetailsSubtitle}>
            Stay connected! We are always ready to help you.
          </p>
          <div className={style.fieldWrapper}>
            <Field
              className={style.carDetailsInput}
              type="text"
              name="name"
              placeholder="Name*"
            />
            <ErrorMessage name="name">
              {(msg) => <span className={style.error}>{msg}</span>}
            </ErrorMessage>
          </div>
          <div className={style.fieldWrapper}>
            <Field
              className={style.carDetailsInput}
              type="email"
              name="email"
              placeholder="Email*"
            />
            <ErrorMessage name="email">
              {(msg) => <span className={style.error}>{msg}</span>}
            </ErrorMessage>
          </div>
          <DatePicker
            selected={selectedDate}
            name="date"
            onChange={(date: Date | null) => setSelectedDate(date)}
            placeholderText="Booking date"
            className={style.input}
            wrapperClassName={style.calendarWrapper}
            minDate={new Date()}
            dateFormat="dd.MM.yyyy"
            locale="enGB"
            calendarClassName={style.calendar}
            popperClassName={style.popper}
            fixedHeight
            customInput={<ReadOnlyInput />}
          />
          <Field
            className={`${style.carDetailsInput} ${style.textarea}`}
            as="textarea"
            name="comment"
            placeholder="Comment"
            rows="3"
          />
          <button
            className={style.carDetailsBtn}
            type="submit"
            disabled={mutation.status === "pending"}
          >
            {mutation.status === "pending" ? "Sending..." : "Send"}
          </button>
        </fieldset>
      </Form>
    </Formik>
  );
}
