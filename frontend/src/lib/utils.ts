import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
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
    hidden: {opacity: 0, y: 24},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.6},
    },
}

export const socialGovernanceMainShowVariants = ["No Mention", "Weak", "Moderate", "Strong"]

export const socialGovernanceTooltipVariants = ["Measures have not been taken, or haven't been disclosed in the report", "A concrete policy exists, but no specific information on implementation has been mentioned in the report", "A concrete policy exists, and concrete details on implementation have been provided", "A concrete policy exists, and the company has provided details on measured outcomes, remediation and steps to improve further"]


export function stringToColor(str: string) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return `hsl(${hash % 360}, 65%, 55%)`
}

export function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map(w => w[0])
        .join("")
        .toUpperCase()
}

export function stringToGradient(name: string) {
    const h = Math.abs(name.split("").reduce((a,c)=>a+c.charCodeAt(0),0)) % 360
    return `linear-gradient(135deg, hsl(${h},70%,55%), hsl(${(h+40)%360},70%,60%))`
}