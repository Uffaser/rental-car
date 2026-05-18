"use client";

interface LoadingProps {
  message?: string;
  inline?: boolean;
}

export default function Loading({
  message = "Loading...",
  inline = false,
}: LoadingProps) {
  return (
    <div className={inline ? "loadingInline" : "loadingBox"}>
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
