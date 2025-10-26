import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { IconType } from "react-icons";

export function InputContainer({
  children,
  column,
}: Readonly<{ children?: React.ReactNode; column?: boolean }>) {
  let className = "flex w-full gap-x-2 gap-y-3";
  className += column ? " flex-col" : " items-center";
  return <div className={className}>{children}</div>;
}

export function Label({
  children,
  ...restProps
}: Readonly<
  { children?: React.ReactNode } & Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    "className"
  >
>) {
  return <label {...restProps}>{children}</label>;
}

export function Input({
  type,
  title,
  dir,
  endText,
  startText,
  EndIcon,
  StartIcon,
  disabled,
  ...restProps
}: Readonly<
  {
    type: TInputType;
    title: string;
    StartIcon?: IconType;
    startText?: React.ReactNode;
    EndIcon?: IconType;
    endText?: React.ReactNode;
    dir?: "rtl" | "ltr";
    disabled?: boolean;
  } & Omit<InputHTMLAttributes<HTMLInputElement>, "className"> &
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">
>) {
  let className =
    "flex items-center gap-2 p-1 bg-white text-black border border-white/20 transition focus:border-b-white/60 focus:border-r-white/60  rounded-xl";

  className += type === "text" ? " grow " : type === "number" ? " grow " : "";
  className += type === "file" ? " hidden" : "";
  className += disabled ? " cursor-not-allowed pointer-events-none" : "";

  return (
    <div className={className}>
      {StartIcon && <StartIcon />}
      {startText}
      {type === "textarea" ? (
        <textarea
          title={title}
          dir={dir}
          className="grow focus:outline-0 py-1 px-2"
          {...restProps}
        />
      ) : (
        <input
          title={title}
          type={type}
          dir={dir}
          className="grow focus:outline-0 py-1 px-2"
          {...restProps}
        />
      )}
      {endText && endText}
      {EndIcon && <EndIcon />}
    </div>
  );
}

export function giveValueInput(e: any): undefined | string | number {
  if (!e.target) throw Error("e doesn't have have target !!");
  const type: TInputType = e.target.type;
  let value;
  switch (type) {
    case "checkbox":
      value = e.target.checked;
      break;
    case "text":
      value = e.target.value;
      break;
    case "number":
      value =
        typeof e.target.value == "number"
          ? e.target.value
          : isNaN(parseFloat(e.target.value))
          ? 0
          : parseFloat(e.target.value);
      break;
    default:
      value = e.target.value;
      break;
  }
  return value;
}
