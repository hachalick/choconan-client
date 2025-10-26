import React from "react";

export default function P({
  size,
  children,
}: Readonly<{
  size: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}>) {
  let className = "indent-5";

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

  return <p className={className}>{children}</p>;
}
