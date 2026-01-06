"use client"

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    ShieldCheck,
    Database,
    BarChart3,
    FileText,
    Sparkles,
    ArrowRight,
    ExternalLink,
    CheckCircle2,
    LineChart,
    Layers,
    Lock,
    Rocket,
} from "lucide-react";

/**
 * Open ESG Tracker — Single-file landing page
 * - Tailwind CSS classes (no import needed)
 * - shadcn/ui components
 * - Framer Motion for tasteful animation
 */

// shadcn/ui
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import Link from "next/link";

const EXAMPLE_COMPANIES = [
    { name: "Unilever", sector: "Consumer", region: "Global"},
    { name: "Microsoft", sector: "Technology", region: "Global" },
    { name: "Toyota", sector: "Automotive", region: "APAC" },
    { name: "Nestlé", sector: "Consumer", region: "EMEA" },
    { name: "Maersk", sector: "Logistics", region: "EMEA" },
    { name: "Tata Steel", sector: "Industrial", region: "India" },
];

const EXAMPLE_SOURCES = [
    { label: "Sustainability / ESG reports", icon: FileText },
    { label: "Regulatory filings & disclosures", icon: ShieldCheck },
    { label: "Press releases & investor updates", icon: ExternalLink },
    { label: "Standards bodies & initiatives", icon: Layers },
    { label: "Open datasets & public registries", icon: Database },
];

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5">
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
                {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
            </CardContent>
        </Card>
    );
}

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
    );
}

export default function RootLayout() {
    const [query, setQuery] = useState("");
    const [sector, setSector] = useState<string>("All");
    const [region, setRegion] = useState<string>("All");

    const sectors = useMemo(() => {
        const s = new Set<string>(["All"]);
        EXAMPLE_COMPANIES.forEach((c) => s.add(c.sector));
        return Array.from(s);
    }, []);

    const regions = useMemo(() => {
        const r = new Set<string>(["All"]);
        EXAMPLE_COMPANIES.forEach((c) => r.add(c.region));
        return Array.from(r);
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return EXAMPLE_COMPANIES.filter((c) => {
            const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q);
            const matchesSector = sector === "All" || c.sector === sector;
            const matchesRegion = region === "All" || c.region === region;
            return matchesQuery && matchesSector && matchesRegion;
        });
    }, [query, sector, region]);

    return (
        <div className="min-h-screen bg-background">
            {/* Top bar */}
            <TopBar/>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -top-24 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-muted to-transparent blur-3xl" />
                    <div className="absolute -bottom-24 left-1/3 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-muted to-transparent blur-3xl" />
                </div>

                <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap items-center gap-2"
                        >
                            <Badge variant="secondary" className="rounded-full">
                                <Sparkles className="mr-1 h-3.5 w-3.5" /> Open-source
                            </Badge>
                            <Pill>Public-domain only</Pill>
                            <Pill>Transparent methodology</Pill>
                            <Pill>Built for everyone</Pill>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.05 }}
                            className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl"
                        >
                            The go-to place to understand what top global companies are doing in ESG — commitments and real action.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.1 }}
                            className="mt-4 text-base text-muted-foreground md:text-lg"
                        >
                            We ingest ESG signals from public sources, normalize them, and publish easy dashboards and plain-language
                            summaries. No paywalls. No jargon. Just verifiable data and clear context.
                        </motion.p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search a company (e.g., Microsoft, Unilever…)"
                                    className="h-11 rounded-2xl pl-9"
                                />
                            </div>
                            <Button className="h-11 rounded-2xl" onClick={() => window.alert("Search results placeholder")}
                            >Search</Button
                            >
                            <Button
                                variant="outline"
                                className="h-11 rounded-2xl"
                                onClick={() => window.alert("API docs placeholder")}
                            >
                                View API
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" /> Source-cited
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4" /> Privacy-respecting
                            </div>
                            <div className="flex items-center gap-2">
                                <LineChart className="h-4 w-4" /> Trend-aware
                            </div>
                            <div className="flex items-center gap-2">
                                <Rocket className="h-4 w-4" /> Community-built
                            </div>
                        </div>
                    </div>

                    {/* Hero right: preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.08 }}
                        className="relative"
                    >
                        <Card className="rounded-3xl shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Live search</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 pt-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge className="rounded-full" variant="secondary">
                                        <BarChart3 className="mr-1 h-3.5 w-3.5" /> Overall
                                    </Badge>
                                    <Badge className="rounded-full" variant="secondary">
                                        <Database className="mr-1 h-3.5 w-3.5" /> Evidence
                                    </Badge>
                                    <Badge className="rounded-full" variant="secondary">
                                        <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Governance
                                    </Badge>
                                </div>

                                <div className="mt-4 grid gap-3">
                                    {filtered.slice(0, 5).map((c) => (
                                        <div
                                            key={c.name}
                                            className="flex items-center justify-between rounded-2xl border p-3"
                                        >
                                            <div>
                                                <div className="text-sm font-medium">{c.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {c.sector} • {c.region}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-5" />

                                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                                    <Button
                                        variant="outline"
                                        className="rounded-2xl"
                                        onClick={() => window.alert("Methodology placeholder")}
                                    >
                                        Read methodology <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="mx-auto max-w-6xl px-4 pb-10">
                <div className="grid gap-4 md:grid-cols-4">
                    <Stat label="Coverage" value="Top global corporates" sub="Starting with largest market caps; expanding via community" />
                    <Stat label="Sources" value="Public-domain" sub="Reports, filings, initiatives, registries, announcements" />
                    <Stat label="Outputs" value="Dashboards + summaries" sub="Readable by anyone, but traceable to evidence" />
                    <Stat label="License" value="Open-source" sub="Code + schemas + scoring methods in public" />
                </div>
            </section>

            {/* What we do */}
            <section className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <div className="text-sm font-semibold">What we do</div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight">From messy disclosures to clear, comparable insight.</h2>
                        <p className="mt-3 text-muted-foreground">
                            ESG information is scattered across PDFs, websites, disclosures, and initiatives. We continuously ingest,
                            standardize, and connect evidence to create a single, consistent picture per company.
                        </p>

                        <div className="mt-5 grid gap-3">
                            <Card className="rounded-2xl shadow-sm">
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-2xl border p-2">
                                            <Database className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">Ingest</div>
                                            <div className="mt-1 text-sm text-muted-foreground">
                                                Collect ESG claims, metrics, and events from public sources. Capture timestamps, provenance, and
                                                document-level evidence.
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="rounded-2xl shadow-sm">
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-2xl border p-2">
                                            <Layers className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">Normalize</div>
                                            <div className="mt-1 text-sm text-muted-foreground">
                                                Convert varied formats into a consistent schema. Map terms to standardized categories (E, S, G)
                                                and highlight missing or ambiguous disclosure.
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="rounded-2xl shadow-sm">
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-2xl border p-2">
                                            <BarChart3 className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">Explain</div>
                                            <div className="mt-1 text-sm text-muted-foreground">
                                                Publish dashboards, timelines, and plain-language summaries. Every claim links back to the
                                                original evidence.
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sources */}
                    <Card className="rounded-3xl shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base">Public sources we use</CardTitle>
                            <CardDescription>
                                Only publicly available sources. We store provenance and encourage community review.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-5 pt-0">
                            <div className="grid gap-3">
                                {EXAMPLE_SOURCES.map((s) => (
                                    <div key={s.label} className="flex items-center justify-between rounded-2xl border p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-2xl border p-2">
                                                <s.icon className="h-4 w-4" />
                                            </div>
                                            <div className="text-sm">{s.label}</div>
                                        </div>
                                        <Badge variant="secondary" className="rounded-full">
                                            source-cited
                                        </Badge>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-5" />

                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="rounded-2xl border p-4">
                                    <div className="flex items-center gap-2 text-sm font-semibold">
                                        <ShieldCheck className="h-4 w-4" /> Trust & traceability
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        We show “why” behind a score: evidence coverage, recency, and confidence. No black boxes.
                                    </p>
                                </div>
                                <div className="rounded-2xl border p-4">
                                    <div className="flex items-center gap-2 text-sm font-semibold">
                                        <Lock className="h-4 w-4" /> Responsible use
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        We avoid personal data and focus on corporate disclosures and initiatives.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* How it works */}
            <section className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: Database,
                            title: "Continuous ingestion",
                            desc: "Pipelines pull new disclosures and updates regularly, then de-duplicate and version evidence.",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Quality & provenance",
                            desc: "Every metric is tied to a source, date, and confidence level. Community review is encouraged.",
                        },
                        {
                            icon: BarChart3,
                            title: "Dashboards & summaries",
                            desc: "Fast comparisons across companies, plus plain-language summaries and timelines anyone can follow.",
                        },
                    ].map((s) => (
                        <Card key={s.title} className="rounded-3xl shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-2xl border p-2">
                                        <s.icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">{s.title}</div>
                                        <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-4 py-14">
                <Card className="rounded-3xl shadow-sm">
                    <CardContent className="p-7 md:p-10">
                        <div className="grid items-center gap-6 md:grid-cols-2">
                            <div>
                                <div className="text-sm font-semibold">Join the mission</div>
                                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                                    Make ESG information understandable, verifiable, and open.
                                </h3>
                                <p className="mt-2 text-muted-foreground">
                                    Whether you’re a developer, researcher, journalist, student, or simply curious — help us expand coverage,
                                    improve methods, and keep the data honest.
                                </p>
                                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                                    <Link href={process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL}>
                                        <Button className="rounded-2xl"
                                        >Contribute on GitHub</Button
                                        >
                                    </Link>
                                </div>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                {[
                                    { title: "For everyone", desc: "Plain-language summaries and explainers" },
                                    { title: "For analysts", desc: "Open datasets, filters, exports" },
                                    { title: "For builders", desc: "APIs, schemas, reproducible pipelines" },
                                    { title: "For watchdogs", desc: "Evidence links, versioning, transparency" },
                                ].map((x) => (
                                    <div key={x.title} className="rounded-2xl border p-4">
                                        <div className="text-sm font-semibold">{x.title}</div>
                                        <div className="mt-1 text-sm text-muted-foreground">{x.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <BottomBar/>
        </div>
    );
}
