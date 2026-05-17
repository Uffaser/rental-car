"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import style from "./CarDetailsForm.module.css";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { postBookingCar } from "@/lib/api/clientApi";

export interface DetailsFormValues {
  name: string;
  email: string;
  date: string;
  comment: string;
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

const DetailsFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "The name must contain at least 1 character.")
    .max(96, "The name is too long.")
    .required("This field is required."),
  email: Yup.string().email().required("This field is required."),
  date: Yup.string()
    .trim()
    .test("is-valid-date", "Invalid date format.", (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format."),
  comment: Yup.string().max(1000, "The comment is too long."),
});

export default function CarDetailsForm({ id }: Props) {
  const mutation = useMutation({
    mutationFn: (values: DetailsFormValues) => postBookingCar(id, values),
    onSuccess: () => {
      toast.success("Завдання успішно створено!");
    },
    onError: () => {
      toast.error("Помилка при створенні завдання. Спробуйте ще раз.");
    },
  });

  const handleSubmit = (
    values: DetailsFormValues,
    actions: FormikHelpers<DetailsFormValues>,
  ) => {
    mutation.mutate(values, {
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
            type="date"
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
          <button
            className={style.carDetailsBtn}
            type="submit"
            disabled={mutation.status === "loading"}
          >
            {mutation.status === "loading" ? "Sending..." : "Send"}
          </button>
        </fieldset>
      </Form>
    </Formik>
  );
}
