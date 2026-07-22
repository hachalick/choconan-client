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
    "flex justify-center gap-2 items-center p-2 rounded-xl bg-gradient-to-br transition text-white border-2 ";

  className += wFull ? " w-full" : " w-fit";

  className +=
    variant === "primary"
      ? " from-primary-28 to-primary-84 border-primary-36 hover:from-primary-36 text-white shadow-primary-sm"
      : variant === "error"
      ? " from-error-28 to-error-84 border-error-36 hover:from-error-36 text-white shadow-error-sm"
      : variant === "success"
      ? " from-success-28 to-success-84 border-success-36 hover:from-success-36 text-white shadow-success-sm"
      : variant === "warning"
      ? " from-warning-28 to-warning-84 border-warning-36 hover:from-warning-36 text-white shadow-warning-sm"
      : variant === "secondary"
      ? " from-secondary-28 to-secondary-84 border-secondary-36 hover:from-secondary-36 text-white shadow-secondary-sm"
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
