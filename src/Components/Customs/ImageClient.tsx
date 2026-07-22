"use client";
import { ERoute } from "@/Common/Enums/Routs";
import Image from "next/image";
import React, { useState } from "react";

function ImageClient({
  alt,
  src,
  className,
  height,
  width,
}: {
  alt: string;
  src: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  let classImg = "rounded-t-xl w-36 h-36 object-contain";
  let heightImg = 500;
  let widthImg = 500;
  className && (classImg = className);
  height && (heightImg = height);
  width && (widthImg = width);

  const [imgError, setImgError] = useState(false);
  const default_img = "/s-logo.jpg";

  return (
    <>
      {imgError ? (
        <Image
          className={classImg}
          src={default_img}
          alt={alt}
          width={widthImg}
          height={heightImg}
          loading="lazy"
        />
      ) : (
        <Image
          className={classImg}
          src={src}
          alt={alt}
          width={widthImg}
          height={heightImg}
          onError={() => setImgError(true)}
        />
      )}
    </>
  );
}

export default ImageClient;
