import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { FaSpinner } from "react-icons/fa";

export function Button({
  variant,
  title,
  children,
  EndIcon,
  StartIcon,
  href,
  wFull,
  loading,
  loadingChild,
  ...restProps
}: Readonly<
  {
    variant: TVariant;
    title: string;
    children?: React.ReactNode;
    StartIcon?: IconType;
    EndIcon?: IconType;
    href?: string;
    wFull?: boolean;
    loading?: boolean;
    loadingChild?: React.ReactNode;
  } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "title">
>) {
  let className =
    "flex justify-center gap-2 items-center p-2 rounded-xl bg-gradient-to-br transition duration-500 text-white border-2 ";

  className += wFull ? " w-full" : " w-fit";

  className +=
    variant === "primary"
      ? " border-primary-36 from-primary-28 to-primary-84 hover:border-primary-44 hover:from-primary-44 hover:to-primary-88 text-white shadow-primary-sm"
      : variant === "error"
      ? " border-error-36 from-error-28 to-error-84 hover:border-error-44 hover:from-error-44 hover:to-error-88 text-white shadow-error-sm"
      : variant === "success"
      ? " border-success-36 from-success-28 to-success-84 hover:border-success-44 hover:from-success-44 hover:to-success-88 text-white shadow-success-sm"
      : variant === "warning"
      ? " border-warning-36 from-warning-28 to-warning-84 hover:border-warning-44 hover:from-warning-44 hover:to-warning-88 text-white shadow-warning-sm"
      : variant === "secondary"
      ? " border-secondary-36 from-secondary-28 to-secondary-84 hover:border-secondary-44 hover:from-secondary-44 hover:to-secondary-88 text-white shadow-secondary-sm"
      : variant === "guest"
      ? " backdrop-blur-xs text-black border-white bg-white/30 shadow-sm shadow-2xl"
      : "";

  className += loading || restProps.disabled ? " grayscale disabled cursor-not-allowed" : " cursor-pointer";

  return href ? (
    <Link href={href}>
      <button type="button" title={title} className={className} {...restProps}>
        {StartIcon &&
          (loading ? (
            <span className="">
              <FaSpinner size={20} className="animate-spin" />
            </span>
          ) : (
            <span className="">
              <StartIcon size={20} className="" />
            </span>
          ))}
        {loading && loadingChild ? (
          loadingChild
        ) : children ? (
          <div className="flex mx-auto justify-center items-center">
            {children}
          </div>
        ) : (
          <></>
        )}
        {EndIcon &&
          (loading ? (
            <span className="">
              <FaSpinner size={20} className="animate-spin" />
            </span>
          ) : (
            <span className="">
              <EndIcon size={20} className="" />
            </span>
          ))}
      </button>
    </Link>
  ) : (
    <button type="button" title={title} className={className} {...restProps}>
      {StartIcon &&
        (loading ? (
          <span className="">
            <FaSpinner size={20} className="animate-spin" />
          </span>
        ) : (
          <span className="">
            <StartIcon size={20} className="" />
          </span>
        ))}
      {loading && loadingChild ? (
        loadingChild
      ) : children ? (
        <div className="flex mx-auto justify-center items-center">
          {children}
        </div>
      ) : (
        <></>
      )}
      {EndIcon &&
        (loading ? (
          <span className="">
            <FaSpinner size={20} className="animate-spin" />
          </span>
        ) : (
          <span className="">
            <EndIcon size={20} className="" />
          </span>
        ))}
    </button>
  );
}
