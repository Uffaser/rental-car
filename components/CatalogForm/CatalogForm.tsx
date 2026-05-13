"use client";

import { Field, Form, Formik } from "formik";
import { useId } from "react";
import style from "./CatalogForm.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";

export default function CatalogForm() {
  const fieldId = useId();
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form className={style.catalogForm}>
        <div className={style.labelWrapper}>
          <label className={style.selectLabel} htmlFor={`${fieldId}-brand`}>
            Car brand
          </label>
          <Field
            className={style.selectOne}
            type="select"
            name="brand"
            placeholder="Choose a brand"
            id={`${fieldId}-brand`}
          ></Field>
        </div>
        <div className={style.labelWrapper}>
          <label className={style.selectLabel} htmlFor={`${fieldId}-price`}>
            Price/ 1 hour
          </label>
          <Field
            className={style.selectOne}
            type="select"
            name="price"
            placeholder="Choose a price"
            id={`${fieldId}-price`}
          ></Field>
        </div>
        <div className={style.labelWrapper}>
          <label className={style.selectLabel} htmlFor={`${fieldId}-Mileage`}>
            Сar mileage / km
          </label>
          <div className={style.rangeSelection}>
            <Field
              className={`${style.selectDuo} ${style.from}`}
              type="select"
              name="fromMileage"
              placeholder="From "
              id={`${fieldId}-Mileage`}
            ></Field>
            <Field
              className={`${style.selectDuo} ${style.to}`}
              type="select"
              name="toMileage"
              placeholder="To"
              id={`${fieldId}-Mileage`}
            ></Field>
          </div>
        </div>
        <button className={style.formBtn} type="button">
          Search
        </button>
      </Form>
    </Formik>
  );
}
