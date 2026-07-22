import React, { OptionHTMLAttributes, SelectHTMLAttributes } from "react";

export function Select({
  children,
  title,
  name,
  grow,
  ...restProps
}: Readonly<{
  title: string;
  name: string;
  grow?: boolean;
  children?: React.ReactNode;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className">>) {
  return (
    <select name={name} title={title} {...restProps} className={"p-2 bg-white text-black rounded-xl " + (grow ? "grow" : "")}>
      {children}
    </select>
  );
}

export function Option({
  children,
  value,
  ...restProps
}: Readonly<{
  value: string;
  children?: React.ReactNode;
} & Omit<OptionHTMLAttributes<HTMLOptionElement>, "className">>) {
  return <option value={value} {...restProps}>{children}</option>;
}
