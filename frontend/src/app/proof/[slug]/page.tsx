"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Download, FileText} from "lucide-react";
import {useParams} from "next/navigation";
import {motion} from "framer-motion";
import {heroFadeUpVariants} from "@/lib/utils";
import TopBar from "@/components/TopBar";

// Animated, neutral download page using pastel green design language

const mockReports = [
    {id: 1, title: "Annual ESG Report", year: "2023", size: "4.2 MB"},
    {id: 2, title: "Sustainability Disclosure", year: "2022", size: "3.1 MB"},
    {id: 3, title: "Impact Assessment", year: "2021", size: "2.6 MB"},
];

export default function CompanyDownloadsPage() {
    const params = useParams();
    const slug = params?.slug as string;

    return (
        <div className="min-h-screen bg-[#f3f6ef] text-black">

            <TopBar/>

            <motion.main
                initial="hidden"
                animate="visible"
                variants={heroFadeUpVariants}
                className="mx-auto max-w-5xl px-6 py-12"
            >
                {/* Header */}
                <motion.section variants={heroFadeUpVariants} className="mb-10">
                    <h1 className="text-3xl font-semibold tracking-tight capitalize text-foreground">
                        {slug?.replace(/-/g, " ")}
                    </h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Download official ESG reports and sustainability disclosures published by this company.
                    </p>
                </motion.section>

                {/* Reports list */}
                <motion.section variants={heroFadeUpVariants} className="space-y-4">
                    {mockReports.map((report) => (
                        <motion.div key={report.id} variants={heroFadeUpVariants}>
                            <Card className="rounded-2xl border-emerald-100 bg-emerald-50/40 shadow-sm">
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-xl bg-emerald-100/70 p-3">
                                            <FileText className="h-5 w-5 text-emerald-700"/>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground">{report.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {report.year} · {report.size}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                    >
                                        <Download className="h-4 w-4"/>
                                        Download
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Empty state */}
                {mockReports.length === 0 && (
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
            </motion.main>
        </div>
    );
}