import React from "react";
import { SlArrowLeft } from "react-icons/sl";

export default function Summary({
  variant,
  children,
}: Readonly<{
  variant: TVariant;
  children?: React.ReactNode;
}>) {
  let className =
    "rounded-2xl shadow-primary-sm p-3 bg-gradient-to-br transition text-white border-2 gap-2 relative flex cursor-pointer";

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

  return (
    <summary className={className}>
      <SlArrowLeft className="absolute left-3 my-auto "/> {children}
    </summary>
  );
}
