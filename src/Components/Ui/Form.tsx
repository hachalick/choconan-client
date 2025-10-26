import React, { ButtonHTMLAttributes, FormHTMLAttributes } from "react";

export default function Form({
  variant,
  children,
  col,
  ...restProps
}: Readonly<
  {
    variant: TVariant;
    children?: React.ReactNode;
    col?: boolean;
  } & Omit<FormHTMLAttributes<HTMLFormElement>, "className">
>) {
  let className =
    "rounded-2xl p-3 bg-gradient-to-br transition border-2 grid gap-6";

  className +=
    variant === "primary"
      ? " from-primary-28 to-primary-84 border-primary-28 text-white shadow-primary-sm"
      : variant === "error"
      ? " from-error-28 to-error-84 border-error-28 text-white shadow-error-sm"
      : variant === "success"
      ? " from-success-28 to-success-84 border-success-28 text-white shadow-success-sm"
      : variant === "warning"
      ? " from-warning-28 to-warning-84 border-warning-28 text-white shadow-warning-sm"
      : variant === "secondary"
      ? " from-secondary-28 to-secondary-84 border-secondary-28 text-white shadow-secondary-sm"
      : variant === "guest"
      ? " backdrop-blur-xs text-black border-transparent border-white bg-white/30 shadow-sm"
      : "";

  className += col ? " grid-col-1 lg:grid-cols-4 md:grid-col-3 sm:grid-col-2" : "";

  return (
    <form className={className} {...restProps}>
      {children}
    </form>
  );
}
