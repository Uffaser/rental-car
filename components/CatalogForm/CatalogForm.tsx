"use client";

import { Field, Form, Formik } from "formik";
import { useId, useState } from "react";
import style from "./CatalogForm.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import { useQuery } from "@tanstack/react-query";
import { getFilter } from "@/lib/api/clientApi";

function generatePrices(min: number, max: number, step: number) {
  const result: number[] = [];

  for (let value = min; value <= max; value += step) {
    result.push(Math.round(value));
  }

  return result;
}

export default function CatalogForm() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const fieldId = useId();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["filter"],
    queryFn: getFilter,
  });

  if (!data) {
    return "Error";
  }

  const brandOption = data.brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOption = generatePrices(data.price.min, data.price.max, 10).map(
    (price) => ({
      value: String(price),
      label: String(price),
    }),
  );

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form className={style.catalogForm}>
        <div className={style.labelWrapper}>
          <label className={style.selectLabel} htmlFor={`${fieldId}-brand`}>
            Car brand
          </label>
          <CustomSelect
            className={style.selectOne}
            id={`${fieldId}-brand`}
            value={brand}
            placeholder="Choose a brand"
            options={brandOption}
            onChange={(value) => setBrand(value)}
          />
        </div>
        <div className={style.labelWrapper}>
          <label className={style.selectLabel} htmlFor={`${fieldId}-price`}>
            Price/ 1 hour
          </label>
          <CustomSelect
            className={style.selectOne}
            id={`${fieldId}-price`}
            value={price}
            placeholder="Choose a price"
            options={priceOption}
            onChange={(value) => setPrice(value)}
          />
        </div>
        <div className={style.labelWrapper}>
          <label className={style.selectLabel} htmlFor={`${fieldId}-Mileage`}>
            Сar mileage / km
          </label>
          <div className={style.rangeSelection}>
            <Field
              className={`${style.selectDuo} ${style.from}`}
              type="number"
              name="fromMileage"
              placeholder="From "
              id={`${fieldId}-Mileage`}
            ></Field>
            <Field
              className={`${style.selectDuo} ${style.to}`}
              type="number"
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
