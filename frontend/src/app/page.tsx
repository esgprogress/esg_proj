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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import TopBar from "@/components/TopBar";

const EXAMPLE_COMPANIES = [
    { name: "Unilever", sector: "Consumer", region: "Global", score: 78, trend: "+3" },
    { name: "Microsoft", sector: "Technology", region: "Global", score: 84, trend: "+1" },
    { name: "Toyota", sector: "Automotive", region: "APAC", score: 73, trend: "+2" },
    { name: "Nestlé", sector: "Consumer", region: "EMEA", score: 76, trend: "-1" },
    { name: "Maersk", sector: "Logistics", region: "EMEA", score: 71, trend: "+4" },
    { name: "Tata Steel", sector: "Industrial", region: "India", score: 69, trend: "+2" },
];

const EXAMPLE_SOURCES = [
    { label: "Sustainability / ESG reports", icon: FileText },
    { label: "Regulatory filings & disclosures", icon: ShieldCheck },
    { label: "Press releases & investor updates", icon: ExternalLink },
    { label: "Standards bodies & initiatives", icon: Layers },
    { label: "Open datasets & public registries", icon: Database },
];

function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

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
                                <CardTitle className="text-base">Live preview (sample)</CardTitle>
                                <CardDescription>
                                    Quick look at the kind of ranked, explainable ESG view you’ll get for each company.
                                </CardDescription>
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
                                            <div className="text-right">
                                                <div className="text-sm font-semibold">{c.score}/100</div>
                                                <div className="text-xs text-muted-foreground">Trend {c.trend}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-5" />

                                <div className="grid gap-3 md:grid-cols-3">
                                    <div className="rounded-2xl border p-3">
                                        <div className="text-xs text-muted-foreground">Evidence coverage</div>
                                        <div className="mt-2 text-sm font-medium">High</div>
                                        <div className="mt-1 text-xs text-muted-foreground">Most claims backed with sources</div>
                                    </div>
                                    <div className="rounded-2xl border p-3">
                                        <div className="text-xs text-muted-foreground">Commitment vs action</div>
                                        <div className="mt-2 text-sm font-medium">Action-forward</div>
                                        <div className="mt-1 text-xs text-muted-foreground">Clear progress signals detected</div>
                                    </div>
                                    <div className="rounded-2xl border p-3">
                                        <div className="text-xs text-muted-foreground">Update frequency</div>
                                        <div className="mt-2 text-sm font-medium">Weekly</div>
                                        <div className="mt-1 text-xs text-muted-foreground">Public sources re-checked regularly</div>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                                    <Button className="rounded-2xl" onClick={() => window.alert("Company page placeholder")}
                                    >Open company page</Button
                                    >
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

            {/* Dashboards */}
            <section className="mx-auto max-w-6xl px-4 py-10">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="text-sm font-semibold">Dashboards</div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Explore by company, sector, or theme.</h2>
                        <p className="mt-2 text-muted-foreground">
                            Compare commitments vs action signals, see timelines, and download open data for analysis.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button variant="outline" className="rounded-2xl" onClick={() => window.alert("Dataset download placeholder")}
                        >Download dataset</Button
                        >
                        <Button className="rounded-2xl" onClick={() => window.alert("Open dashboards placeholder")}
                        >Open dashboards <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Card className="mt-6 rounded-3xl shadow-sm">
                    <CardContent className="p-5">
                        <Tabs defaultValue="companies">
                            <TabsList className="grid w-full grid-cols-3 rounded-2xl">
                                <TabsTrigger value="companies" className="rounded-2xl">Companies</TabsTrigger>
                                <TabsTrigger value="themes" className="rounded-2xl">Themes</TabsTrigger>
                                <TabsTrigger value="methods" className="rounded-2xl">Methods</TabsTrigger>
                            </TabsList>

                            <TabsContent value="companies" className="mt-5">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                                    <div className="flex-1">
                                        <div className="text-xs text-muted-foreground">Filter</div>
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            {sectors.map((s) => (
                                                <Button
                                                    key={s}
                                                    size="sm"
                                                    variant={sector === s ? "default" : "outline"}
                                                    className="rounded-full"
                                                    onClick={() => setSector(s)}
                                                >
                                                    {s}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-muted-foreground">Region</div>
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            {regions.map((r) => (
                                                <Button
                                                    key={r}
                                                    size="sm"
                                                    variant={region === r ? "default" : "outline"}
                                                    className="rounded-full"
                                                    onClick={() => setRegion(r)}
                                                >
                                                    {r}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 md:grid-cols-3">
                                    {filtered.map((c) => (
                                        <Card key={c.name} className="rounded-3xl shadow-sm">
                                            <CardContent className="p-5">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <div className="text-sm font-semibold">{c.name}</div>
                                                        <div className="mt-1 text-xs text-muted-foreground">
                                                            {c.sector} • {c.region}
                                                        </div>
                                                    </div>
                                                    <Badge variant="secondary" className="rounded-full">
                                                        {c.score}/100
                                                    </Badge>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between rounded-2xl border p-3">
                                                    <div className="text-xs text-muted-foreground">Momentum</div>
                                                    <div className="text-sm font-medium">{c.trend}</div>
                                                </div>
                                                <div className="mt-4 grid gap-2">
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <CheckCircle2 className="h-4 w-4" /> Evidence-linked metrics
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <CheckCircle2 className="h-4 w-4" /> Timeline of actions
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <CheckCircle2 className="h-4 w-4" /> Plain-language summary
                                                    </div>
                                                </div>
                                                <Button className="mt-5 w-full rounded-2xl" onClick={() => window.alert("Open company placeholder")}
                                                >View profile</Button
                                                >
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="themes" className="mt-5">
                                <div className="grid gap-4 md:grid-cols-3">
                                    {[
                                        { title: "Climate & emissions", desc: "Targets, SBTi status, scope disclosures, progress" },
                                        { title: "Energy & renewables", desc: "Renewable share, PPAs, efficiency programs" },
                                        { title: "Water & waste", desc: "Water risk, circularity, waste diversion" },
                                        { title: "People & safety", desc: "Diversity, labor practices, safety incidents" },
                                        { title: "Supply chain", desc: "Supplier standards, audits, traceability" },
                                        { title: "Governance", desc: "Board oversight, policies, controversies" },
                                    ].map((t) => (
                                        <Card key={t.title} className="rounded-3xl shadow-sm">
                                            <CardContent className="p-5">
                                                <div className="flex items-start gap-3">
                                                    <div className="rounded-2xl border p-2">
                                                        <BarChart3 className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold">{t.title}</div>
                                                        <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    className="mt-5 w-full rounded-2xl"
                                                    onClick={() => window.alert("Theme placeholder")}
                                                >
                                                    Explore theme <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="methods" className="mt-5">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card className="rounded-3xl shadow-sm">
                                        <CardContent className="p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-2xl border p-2">
                                                    <ShieldCheck className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold">Methodology is public</div>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Scoring and labeling prioritize: evidence coverage, recency, specificity, and consistency.
                                                        Community can propose improvements.
                                                    </p>
                                                </div>
                                            </div>
                                            <Separator className="my-5" />
                                            <div className="grid gap-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" /> Evidence-first scoring
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" /> Clear assumptions & caveats
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" /> Reproducible pipelines
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="rounded-3xl shadow-sm">
                                        <CardContent className="p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-2xl border p-2">
                                                    <Database className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold">Open data, open APIs</div>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Downloadable datasets + API endpoints for researchers, journalists, students, and builders.
                                                    </p>
                                                </div>
                                            </div>
                                            <Separator className="my-5" />
                                            <div className="grid gap-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" /> Company profiles
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" /> Metrics & timelines
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4" /> Evidence links
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
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
                                    <Button className="rounded-2xl" onClick={() => window.alert("Contribute placeholder")}
                                    >Contribute on GitHub</Button
                                    >
                                    <Button variant="outline" className="rounded-2xl" onClick={() => window.alert("Community placeholder")}
                                    >Join community</Button
                                    >
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

            {/* Footer */}
            <footer className="border-t">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Open ESG Tracker • Built in public • Data from public sources
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="ghost" className="rounded-xl" onClick={() => window.alert("About placeholder")}
                        >About</Button
                        >
                        <Button variant="ghost" className="rounded-xl" onClick={() => window.alert("Methodology placeholder")}
                        >Methodology</Button
                        >
                        <Button variant="ghost" className="rounded-xl" onClick={() => window.alert("Data policy placeholder")}
                        >Data policy</Button
                        >
                        <Button variant="ghost" className="rounded-xl" onClick={() => window.alert("Contact placeholder")}
                        >Contact</Button
                        >
                    </div>
                </div>
            </footer>
        </div>
    );
}
