"use client"

import {motion} from "framer-motion";
import {heroFadeUp, heroFadeUpVariants} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Download, FileText} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type Report = {
    file_name: string
    file_type: string
    size: number
}

type ReportProofSectionProps = {
    slug: string
    reports: Report[]
}

export default function ReportProofSection({
                                               slug,
                                               reports,
                                           }: ReportProofSectionProps) {
    return (
        <motion.div {...heroFadeUp(0)}>
            <motion.section variants={heroFadeUpVariants} className="space-y-4">
                {reports.map((report) => (
                    <motion.div
                        key={`${slug}-${report.file_name}`}
                        variants={heroFadeUpVariants}
                    >
                        <Card className="rounded-2xl border-emerald-100 bg-emerald-50/40 shadow-sm">
                            <CardContent className="flex items-center justify-between p-6 bg-[#eef2e6]">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-emerald-100/70 p-3">
                                        <FileText className="h-5 w-5 text-emerald-700"/>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">
                                            {report.file_name} Report
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {report.file_type.toUpperCase()} · {report.size} MB
                                        </p>
                                    </div>
                                </div>

                                <Link href={`/api/proof/download?company_slug=${slug}&file_name=${report.file_name}&file_type=${report.file_type}`}>
                                    <Button
                                        variant="outline"
                                        className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                    >
                                        <Download className="h-4 w-4"/>
                                        Download
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.section>

            {/* Empty state */}
            {reports.length === 0 && (
                <motion.div variants={heroFadeUpVariants}>
                    <Card className="rounded-2xl border-emerald-100 bg-emerald-50/40">
                        <CardHeader>
                            <CardTitle>No reports available</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            PDFs for this company will appear here once they are published.
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </motion.div>
    )
}
