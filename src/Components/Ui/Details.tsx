import React, { DetailsHTMLAttributes } from "react";

export default function Details({
  children,
  ...prop
}: Readonly<
  {
    children?: React.ReactNode;
  } & Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "className">
>) {
  return (
    <details className="flex flex-col gap-4" {...prop}>
      {children}
    </details>
  );
}
