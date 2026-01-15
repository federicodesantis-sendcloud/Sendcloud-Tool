import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalizedImage(imageName: string, locale: string, localizedExtension?: string): string {
  if (locale === 'it') {
    return `/images/${imageName}`
  }
  
  const lastDotIndex = imageName.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return `/images/${imageName}-${locale}${localizedExtension ? localizedExtension : ''}`
  }
  
  const baseName = imageName.substring(0, lastDotIndex)
  const extension = localizedExtension || imageName.substring(lastDotIndex)
  return `/images/${baseName}-${locale}${extension}`
}
