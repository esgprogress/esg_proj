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