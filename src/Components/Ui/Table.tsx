import React from "react";

export function Table({
  children,
  variant,
}: Readonly<{
  children?: React.ReactNode;
  variant: Exclude<TVariant, "guest">;
}>) {
  let className = "table";

  className += ` table-${variant}`;

  // let className =
  //   "w-full border-separate border-spacing-2 rounded-2xl p-3 bg-gradient-to-br transition border-2 backdrop-blur-xs text-black border-white bg-white/30 [&_th]:rounded-2xl [&_th]:p-3 [&_th]:bg-gradient-to-br [&_th]:transition [&_th]:border-2";

  // className +=
  //   variant === "primary"
  //     ? " [&_th]:from-primary-28 [&_th]:to-primary-84 [&_th]:border-primary-28 [&_th]:text-white [&_th]:shadow-primary-sm [&_tr]:odd:bg-amber-100 [&_tr]:even:bg-amber-200"
  //     : variant === "error"
  //     ? " [&_th]:from-error-28 [&_th]:to-error-84 [&_th]:border-error-28 [&_th]:text-white [&_tr]:odd:bg-amber-100 [&_tr]:even:bg-amber-200"
  //     : variant === "success"
  //     ? " [&_th]:from-success-28 [&_th]:to-success-84 [&_th]:border-success-28[&_th]: text-white [&_tr]:odd:bg-amber-100 [&_tr]:even:bg-amber-200"
  //     : variant === "warning"
  //     ? " [&_th]:from-warning-28 [&_th]:to-warning-84 [&_th]:border-warning-28 [&_th]:text-white [&_tr]:odd:bg-amber-100 [&_tr]:even:bg-amber-200"
  //     : variant === "secondary"
  //     ? " [&_th]:from-secondary-28 [&_th]:to-secondary-84 [&_th]:border-secondary-28 [&_th]:text-white [&_tr]:odd:bg-amber-100 [&_tr]:even:bg-amber-200"
  //     : "";

  return <table className={className}>{children}</table>;
}

export function TableCaption({
  children,
  position,
}: Readonly<{
  children?: React.ReactNode;
  position: "top" | "bottom";
}>) {
  return <caption className={`caption-${position}`}>{children}</caption>;
}

export function TableThead({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <thead>{children}</thead>;
}

export function TableBody({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <tbody>{children}</tbody>;
}

export function TableTr({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <tr>{children}</tr>;
}

export function TableTh({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <th>{children}</th>;
}

export function TableTd({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <td>{children}</td>;
}
