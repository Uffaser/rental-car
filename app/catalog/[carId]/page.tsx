"use client";

import { useParams } from "next/navigation";

export default function CarDetails() {
  const { carId } = useParams<{ carId: string }>();
  return <div></div>;
}
