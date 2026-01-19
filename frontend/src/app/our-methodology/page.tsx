"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Badge,
    BarChart3,
    Database,
    ExternalLink,
    FileText,
    Layers,
    ShieldCheck,
    Lock,
} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import {motion} from "framer-motion";
import {heroFadeUp} from "@/lib/utils";

const EXAMPLE_SOURCES = [
    {label: "Sustainability / ESG reports", icon: FileText},
    {label: "Regulatory filings & disclosures", icon: ShieldCheck},
    {label: "Press releases & investor updates", icon: ExternalLink},
    {label: "Standards bodies & initiatives", icon: Layers},
    {label: "Open datasets & public registries", icon: Database},
];

export default function OurMethodologyPage() {
    return (
        <div className="min-h-screen bg-[#f3f6ef] text-black">
            <TopBar/>

            {/* Hero / Methodology */}
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Left */}
                    <motion.div {...heroFadeUp(0)}>
                        <h1 className="text-5xl font-semibold">
                            Our Methodology
                        </h1>
                        <h2 className="mt-3 text-3xl font-semibold text-slate-600">
                            From messy disclosures to clear, comparable insight.
                        </h2>
                        <p className="mt-4 text-slate-600">
                            ESG information is scattered across PDFs, websites,
                            disclosures, and initiatives. We continuously ingest,
                            standardize, and connect evidence to create a single,
                            consistent picture per company.
                        </p>

                        <div className="mt-6 grid gap-4">
                            {[
                                {
                                    icon: Database,
                                    title: "Ingest",
                                    desc: "Collect ESG claims, metrics, and events from public sources with timestamps and provenance.",
                                },
                                {
                                    icon: Layers,
                                    title: "Normalize",
                                    desc: "Convert varied formats into a consistent schema and map disclosures to ESG categories.",
                                },
                                {
                                    icon: BarChart3,
                                    title: "Explain",
                                    desc: "Dashboards and summaries that always link back to original evidence.",
                                },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.title}
                                    {...heroFadeUp(0.08 * (i + 1))}
                                >
                                    <Card className="rounded-2xl bg-[#eef2e6] border-[#c6d1b3] shadow-sm">
                                        <CardContent className="p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-2xl border border-[#c6d1b3] p-2">
                                                    <s.icon className="h-4 w-4"/>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold">
                                                        {s.title}
                                                    </div>
                                                    <div className="mt-1 text-sm text-slate-600">
                                                        {s.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right – Sources */}
                    <motion.div {...heroFadeUp(0.12)}>
                        <Card className="rounded-3xl bg-[#eef2e6] border-[#c6d1b3] shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Public sources we use
                                </CardTitle>
                                <CardDescription>
                                    Only publicly available sources with full
                                    provenance.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="grid gap-3">
                                    {EXAMPLE_SOURCES.map((s, i) => (
                                        <motion.div
                                            key={s.label}
                                            {...heroFadeUp(0.16 + i * 0.04)}
                                            className="flex items-center justify-between rounded-2xl border border-[#c6d1b3] p-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-2xl border border-[#c6d1b3] p-2">
                                                    <s.icon className="h-4 w-4"/>
                                                </div>
                                                <span className="text-sm">
                                                    {s.label}
                                                </span>
                                            </div>
                                            <Badge className="rounded-full bg-[#dfe6cf] text-black">
                                                source-cited
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>

                                <Separator className="my-5"/>

                                <div className="grid gap-3 md:grid-cols-2">
                                    {[
                                        {
                                            icon: ShieldCheck,
                                            title: "Trust & traceability",
                                            desc: "Evidence coverage, recency, and confidence are always visible.",
                                        },
                                        {
                                            icon: Lock,
                                            title: "Responsible use",
                                            desc: "We avoid personal data and focus on corporate disclosures.",
                                        },
                                    ].map((s, i) => (
                                        <motion.div
                                            key={s.title}
                                            {...heroFadeUp(0.32 + i * 0.06)}
                                            className="rounded-2xl border border-[#c6d1b3] p-4"
                                        >
                                            <div className="flex items-center gap-2 text-sm font-semibold">
                                                <s.icon className="h-4 w-4"/>
                                                {s.title}
                                            </div>
                                            <p className="mt-2 text-sm text-slate-600">
                                                {s.desc}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* How it works */}
            <section className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: Database,
                            title: "Continuous ingestion",
                            desc: "Pipelines regularly pull, de-duplicate, and version disclosures.",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Quality & provenance",
                            desc: "Every metric is source-linked and reviewable.",
                        },
                        {
                            icon: BarChart3,
                            title: "Dashboards & summaries",
                            desc: "Clear comparisons and timelines anyone can follow.",
                        },
                    ].map((s, i) => (
                        <motion.div
                            key={s.title}
                            {...heroFadeUp(0.1 * i)}
                        >
                            <Card className="rounded-3xl bg-[#eef2e6] border-[#c6d1b3] shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl border border-[#c6d1b3] p-2">
                                            <s.icon className="h-4 w-4"/>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">
                                                {s.title}
                                            </div>
                                            <div className="mt-1 text-sm text-slate-600">
                                                {s.desc}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            <BottomBar/>
        </div>
    );
}
