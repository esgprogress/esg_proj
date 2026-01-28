"use client"

import {EnvironmentalQuantitativeSection} from "@/app/company/[slug]/components/EnvironmentalQuantitativeSection";
import {EnvironmentalQualitativeSection} from "@/app/company/[slug]/components/EnvironmentQualitativeSection";
import {SocialGovernanceSection} from "@/app/company/[slug]/components/SocialGovernanceSection";
import React, {useState} from "react";
import {EnvironmentalQuantitativeSectionV2} from "@/app/company/[slug]/components/EnvironmentalQuantitativeSectionV2";
import {Button} from "@/components/ui/button";
import {MessageSquare} from "lucide-react";

type EnvironmentalQuantitativeSectionProps = {
    company: any
}

export default function EnvironmentalQuantitativeParent({company}: EnvironmentalQuantitativeSectionProps) {
    const [text, setText] = useState<string>("Graph Representation");

    const swapTextFieldValues = () => {
        if (text === "Graph Representation") {
            setText("Tabular Representation");
        } else if (text === "Tabular Representation") {
            setText("Graph Representation");
        }
    }

    return (
        <>
            {text === "Graph Representation" ? (
                <EnvironmentalQuantitativeSection
                    environmental={company.environmental}
                />
            ) : (
                <EnvironmentalQuantitativeSectionV2
                    environmental={company.environmental}
                />
            )}

            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    className="h-auto px-5 py-3 rounded-full shadow-lg whitespace-nowrap"
                    onClick={swapTextFieldValues}
                >
                    {text}
                </Button>
            </div>

        </>
    )
}