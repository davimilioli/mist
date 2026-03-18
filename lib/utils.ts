import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTemp = (temp: number | undefined): string | number => {
  if(temp === undefined) return "--";
  return Math.round(temp)
}

export const formatWind = (wind: number): number => {
  return Math.round(wind * 3.6);
}
