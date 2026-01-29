import {CompanyHeader} from "./components/CompanyHeader"
import {EnvironmentalQuantitativeSection} from "./components/EnvironmentalQuantitativeSection"
import {fetchCompanyESG} from "@/lib/data/fetchCompanyESGData"
import {SocialGovernanceSection} from "@/app/company/[slug]/components/SocialGovernanceSection";
import {EnvironmentalQualitativeSection} from "@/app/company/[slug]/components/EnvironmentQualitativeSection";
import TopBar from "@/components/TopBar";
import React from "react";
import BottomBar from "@/components/BottomBar";
import Link from "next/link";
import ReportProofSection from "@/app/company/[slug]/components/ReportProofSection";
import {fetchProofData} from "@/lib/data/fetchProofData";
import {EnvironmentalQuantitativeSectionV2} from "@/app/company/[slug]/components/EnvironmentalQuantitativeSectionV2";
import EnvironmentalQuantitativeParent from "@/app/company/[slug]/components/EnvironmentalQuantitativeParent";

export default async function CompanyPage({
                                              params,
                                          }: {
    params: { "slug": string }
}) {
    const {slug} = await params
    const company = await fetchCompanyESG(slug)
    const reports = await fetchProofData(slug);
    const sorted_reports = reports.sort((report1, report2) => report2.file_name - report1.file_name)

    return (
        <div className="bg-[#f3f6ef]">
            <TopBar/>
            <main className="px-4 py-14 md:py-20">
                <div className="mx-auto max-w-6xl space-y-14">
                    <CompanyHeader
                        name={company.name}
                        industry={company.industry}
                        country={company.country ?? "USA"}
                    />

                    <EnvironmentalQuantitativeParent company={company}/>

                    <EnvironmentalQualitativeSection rows={company.environmental.qualitative}/>
                    <SocialGovernanceSection social={company.social} governance={company.governance}/>

                    <section className="space-y-6">
                        <header className="space-y-1">
                            <h2 className="text-xl font-semibold">Report Archive</h2>
                        </header>
                        <ReportProofSection slug={slug} reports={sorted_reports}/>
                    </section>

                </div>
            </main>
            <BottomBar/>
        </div>
    )
}
