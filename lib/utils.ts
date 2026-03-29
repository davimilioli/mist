import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTemp = (temp: number | undefined): string | number => {
  if (temp === undefined) return "--";
  return Math.round(temp)
}

export const formatWind = (wind: number): number => {
  return Math.round(wind * 3.6);
}

export function createSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function unslugify(slug: string): string {
  return slug.replace(/-/g, ' ');
}
