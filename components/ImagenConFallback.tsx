'use client'
import Image from 'next/image'
import { useState } from 'react'

interface ImagenConFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
}

export default function ImagenConFallback({ 
  src, 
  alt, 
  fill, 
  width, 
  height, 
  sizes, 
  className,
  priority = false
}: ImagenConFallbackProps) {
  const [error, setError] = useState(false)

  const fallbackUrl = '/logo.png'

  if (fill) {
    return (
      <Image
        src={error ? fallbackUrl : src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        onError={() => setError(true)}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={error ? fallbackUrl : src}
      alt={alt}
      width={width || 400}
      height={height || 400}
      className={className}
      onError={() => setError(true)}
      priority={priority}
    />
  )
}