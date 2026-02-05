"use client"

import {Card, CardContent} from "@/components/ui/card"
import AnimatedSingleSelectDropdown from "@/components/AnimatedSingleSelectDropdown";

interface Props {
    currentSortBy: string;
    setCurrentSortBy: (v: string) => void;
    sortingFactors: string[];
}

export default function CompanySortSidebar({
                                                 currentSortBy,
                                                 setCurrentSortBy,
                                                 sortingFactors
                                             }: Props) {
    return (
        <Card className="rounded-2xl shadow-lg backdrop-blur self-start">
            <CardContent className="p-5 space-y-6">
                <h3 className="text-lg font-semibold">Sort</h3>

                {/* Dropdown */}
                <div className="space-y-2">
                    <AnimatedSingleSelectDropdown listOfValues={sortingFactors} value={currentSortBy}
                                                  onChange={setCurrentSortBy}/>
                </div>

            </CardContent>
        </Card>
    )
}
