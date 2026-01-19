import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const heroFadeUp = (delay = 0) => ({
    initial: {opacity: 0, y: 12},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.6, delay},
});
