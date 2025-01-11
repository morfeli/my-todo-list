import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;
