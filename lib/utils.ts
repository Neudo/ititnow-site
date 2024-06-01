import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDate(date: string) {
  const dateFormat = new Date(date);
  const options = { day: '2-digit'as const, month: '2-digit' as const, year: 'numeric' as const };
  return new Intl.DateTimeFormat('fr-FR', options).format(dateFormat);
}
