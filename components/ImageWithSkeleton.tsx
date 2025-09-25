'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'

type ImageWithSkeletonProps = ImageProps & {
  containerClassName?: string
}

type LoadingCompleteHandler = NonNullable<ImageProps['onLoadingComplete']>

export default function ImageWithSkeleton({
  className,
  containerClassName,
  onLoadingComplete,
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoadingComplete: LoadingCompleteHandler = (img) => {
    setIsLoaded(true)
    onLoadingComplete?.(img)
  }

  return (
    <div className={`image-with-skeleton ${containerClassName ?? ''}`}>
      {!isLoaded && <div className="image-with-skeleton__placeholder skeleton" aria-hidden="true" />}
      <Image
        {...props}
        alt={alt}
        className={className}
        onLoadingComplete={handleLoadingComplete}
      />
      <style jsx>{`
        .image-with-skeleton {
          position: relative;
          display: block;
        }

        .image-with-skeleton :global(img) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-with-skeleton__placeholder {
          position: absolute;
          inset: 0;
          border-radius: inherit;
        }
      `}</style>
    </div>
  )
}
