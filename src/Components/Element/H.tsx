import React from "react";

export function H({
  size,
  children,
  dir,
  text,
}: Readonly<{
  size: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  dir?: "rtl" | "ltr";
  text?: "right" | "left" | "center";
}>) {
  let className = "";

  className +=
    size === 1
      ? " text-3xl font-semibold "
      : size === 2
      ? " text-2xl font-semibold "
      : size === 3
      ? " text-xl font-medium "
      : size === 4
      ? " text-lg font-light "
      : size === 5
      ? " text-md font-light "
      : " text-sm font-light ";

   text && (className += dir === "rtl" ? " text-right" : dir === "ltr" ? " text-left" : " text-center");

  return size === 1 ? (
    <h1 dir={dir} className={className}>
      {children}
    </h1>
  ) : size === 2 ? (
    <h2 dir={dir} className={className}>
      {children}
    </h2>
  ) : size === 3 ? (
    <h3 dir={dir} className={className}>
      {children}
    </h3>
  ) : size === 4 ? (
    <h4 dir={dir} className={className}>
      {children}
    </h4>
  ) : size === 5 ? (
    <h5 dir={dir} className={className}>
      {children}
    </h5>
  ) : (
    <h6 dir={dir} className={className}>
      {children}
    </h6>
  );
}
