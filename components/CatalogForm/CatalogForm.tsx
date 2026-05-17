"use client";

import { Field, Form, Formik } from "formik";
import { useId } from "react";
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

interface FilterFormValues {
  brand: string;
  price: string;
  fromMileage: string;
  toMileage: string;
}

type Props = {
  onChangeBrand: (brand: string) => void;
  onChangePrice: (price: number) => void;
  onChangeMinMileage: (minMileage: number) => void;
  onChangeMaxMileage: (maxMileage: number) => void;
  onClearFilters: () => void;
};

export default function CatalogForm({
  onChangeBrand,
  onChangePrice,
  onChangeMinMileage,
  onChangeMaxMileage,
  onClearFilters,
}: Props) {
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

  const initialValues: FilterFormValues = {
    brand: "",
    price: "",
    fromMileage: "",
    toMileage: "",
  };

  const handleSubmit = (
    values: FilterFormValues,
  ) => {
    const parsedPrice = values.price ? Number(values.price) : 0;
    const parsedFrom = values.fromMileage ? Number(values.fromMileage) : 0;
    const parsedTo = values.toMileage ? Number(values.toMileage) : 0;

    onChangeBrand(values.brand);
    onChangePrice(parsedPrice);
    onChangeMinMileage(parsedFrom);
    onChangeMaxMileage(parsedTo);
  };

  const handleClear = (resetForm: () => void) => {
    resetForm();
    onClearFilters();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, resetForm }) => (
        <Form className={style.catalogForm}>
          <div className={style.labelWrapper}>
            <label className={style.selectLabel} htmlFor={`${fieldId}-brand`}>
              Car brand
            </label>
            <CustomSelect
              className={style.selectOne}
              id={`${fieldId}-brand`}
              name="brand"
              value={values.brand}
              placeholder="Choose a brand"
              options={brandOption}
              onChange={(value) => setFieldValue("brand", value)}
            />
          </div>
          <div className={style.labelWrapper}>
            <label className={style.selectLabel} htmlFor={`${fieldId}-price`}>
              Price/ 1 hour
            </label>
            <CustomSelect
              className={style.selectOne}
              id={`${fieldId}-price`}
              name="price"
              value={values.price}
              placeholder="Choose a price"
              options={priceOption}
              onChange={(value) => setFieldValue("price", value)}
            />
          </div>
          <div className={style.labelWrapper}>
            <label className={style.selectLabel} htmlFor={`${fieldId}-Mileage`}>
              Car mileage / km
            </label>
            <div className={style.rangeSelection}>
              <Field
                className={`${style.selectDuo} ${style.from}`}
                type="number"
                name="fromMileage"
                placeholder="From "
                id={`${fieldId}-Mileage`}
                min={0}
              ></Field>
              <Field
                className={`${style.selectDuo} ${style.to}`}
                type="number"
                name="toMileage"
                placeholder="To"
                id={`${fieldId}-Mileage`}
                min={0}
              ></Field>
            </div>
          </div>
          <button className={style.formBtn} type="submit">
            Search
          </button>
          <button
            className={style.clearBtn}
            type="button"
            onClick={() => handleClear(resetForm)}
          >
            Clear filters
          </button>
        </Form>
      )}
    </Formik>
  );
}
