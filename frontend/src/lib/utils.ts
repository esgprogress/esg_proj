import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Variants} from "framer-motion";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const heroFadeUp = (delay = 0) => ({
    initial: {opacity: 0, y: 12},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.6, delay},
});

export const heroFadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
}