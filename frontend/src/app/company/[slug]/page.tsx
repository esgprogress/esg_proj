
import { CompanyHeader } from "./components/CompanyHeader"
import { EnvironmentalQuantitativeSection } from "./components/EnvironmentalQuantitativeSection"
import { fetchCompanyESG } from "@/lib/data/fetchCompanyESGData"
import {SocialGovernanceSection} from "@/app/company/[slug]/components/SocialGovernanceSection";
import {EnvironmentalQualitativeSection} from "@/app/company/[slug]/components/EnvironmentQualitativeSection";
import TopBar from "@/components/TopBar";
import React from "react";
import BottomBar from "@/components/BottomBar";

export default async function CompanyPage({
                                              params,
                                          }: {
    params: { "slug": string }
}) {
    const {slug} = await params
    const company = await fetchCompanyESG(slug)

    return (
        <>
        <TopBar/>
            <main className="px-4 py-14 md:py-20">
                <div className="mx-auto max-w-6xl space-y-14">
                    <CompanyHeader
                        name={company.name}
                        industry={company.industry}
                        country={company.country ?? "USA"}
                    />

                        <EnvironmentalQuantitativeSection environmental={company.environmental} />
                        <EnvironmentalQualitativeSection rows={company.environmental.qualitative}/>
                        <SocialGovernanceSection social={company.social} governance={company.governance} />
                </div>
            </main>
        <BottomBar/>
        </>
    )
}
