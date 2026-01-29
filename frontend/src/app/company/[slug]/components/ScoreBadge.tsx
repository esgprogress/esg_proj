import {cn, socialGovernanceMainShowVariants, socialGovernanceTooltipVariants} from "@/lib/utils"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export function ScoreBadge({score, tooltip_side}: { score: number, tooltip_side: "left" | "right" }) {
    const mainLabel = socialGovernanceMainShowVariants[score]
    const tooltipLabel = socialGovernanceTooltipVariants[score]

    return (
        <TooltipProvider>
            <Tooltip key={tooltip_side}>
                <TooltipTrigger>
                <span
                    className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        score === 3 && "bg-emerald-100 text-emerald-800",
                        score === 2 && "bg-blue-100 text-blue-800",
                        score === 1 && "bg-amber-100 text-amber-800",
                        score === 0 && "bg-zinc-100 text-zinc-600"
                    )}
                >
                    {mainLabel}
                </span>
                </TooltipTrigger>
                <TooltipContent
                    side={tooltip_side}
                    className="
                        rounded-lg
                        bg-black
                        px-3 py-1.5
                        text-sm text-white
                        shadow-xl
                        animate-in fade-in zoom-in-95
                    max-w-xs
                    whitespace-normal
                    break-words"
                >
                    {tooltipLabel}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>


    )
}
