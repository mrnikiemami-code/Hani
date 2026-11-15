"use client"

import { img_path } from '@/environment';
import Image, { ImageProps } from 'next/image';
import { CSSProperties } from 'react';

interface ImageWithBasePathProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

const ImageWithBasePath = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  id,
  style,
  ...rest
}: ImageWithBasePathProps) => {
  // Combine the base path and the provided src to create the full image source URL
  const fullSrc = `${img_path}${src}`;
  
  // If neither width/height nor fill is provided, fall back to native img to avoid Next/Image constraints
  const shouldUseNextImage = (typeof width === 'number' && typeof height === 'number') || (rest as { fill?: boolean }).fill === true;

  if (!shouldUseNextImage) {
    return (
      <img
        src={fullSrc}
        alt={alt}
        className={className}
        style={style}
        id={id}
        width={width}
        height={height}
      />
    );
  }

  return (
    <Image
      src={fullSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      id={id}
      {...rest}
    />
  );
};

export default ImageWithBasePath;
