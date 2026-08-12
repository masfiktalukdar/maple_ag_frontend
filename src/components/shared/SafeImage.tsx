"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

import { IMAGES } from "@/constants/images";

interface SafeImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
  useNextImage?: boolean; // Set to true to use next/image, false to use standard <img>
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = IMAGES.PLACEHOLDER,
  useNextImage = false,
  className,
  ...props
}: SafeImageProps) {
  const getValidSrc = (inputSrc?: string | null) => {
    if (
      !inputSrc ||
      typeof inputSrc !== "string" ||
      inputSrc.trim() === "" ||
      inputSrc === "null" ||
      inputSrc === "undefined"
    ) {
      return fallbackSrc;
    }
    return inputSrc;
  };

  const [imgSrc, setImgSrc] = useState<string>(() => getValidSrc(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(getValidSrc(src));
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  if (useNextImage) {
    return (
      <Image
        {...props}
        src={imgSrc}
        alt={alt || "Image"}
        className={className}
        onError={handleError}
        unoptimized
      />
    );
  }

  // NextImage props may contain layout, fill, sizes which are invalid for standard <img>, 
  // so we selectively pass valid standard HTML image attributes
  const { width, height, loading, style, title, onClick, onLoad } = props;

  return (
    <img
      src={imgSrc}
      alt={alt || "Image"}
      className={className}
      onError={handleError}
      onLoad={onLoad}
      width={width}
      height={height}
      loading={loading}
      style={style}
      title={title}
      onClick={onClick}
    />
  );
}
