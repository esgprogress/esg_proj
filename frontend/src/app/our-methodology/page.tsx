import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {Badge, BarChart3, Database, ExternalLink, FileText, Layers, ShieldCheck, Lock} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";

const EXAMPLE_SOURCES = [
    { label: "Sustainability / ESG reports", icon: FileText },
    { label: "Regulatory filings & disclosures", icon: ShieldCheck },
    { label: "Press releases & investor updates", icon: ExternalLink },
    { label: "Standards bodies & initiatives", icon: Layers },
    { label: "Open datasets & public registries", icon: Database },
];

export default function OurMethodologyPage() {

    return (
        <div className="min-h-screen bg-[#8d9765]">

            <TopBar/>

            <section className="mx-auto max-w-6xl px-4 py-10 text-black">

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <div className="font-semibold text-black text-5xl">Our Methodology</div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#545454]">From messy disclosures to clear, comparable insight.</h2>
                        <p className="mt-3 text-muted-foreground">
                            ESG information is scattered across PDFs, websites, disclosures, and initiatives. We continuously ingest,
                            standardize, and connect evidence to create a single, consistent picture per company.
                        </p>

                        <div className="mt-5 grid gap-3">
                            <Card className="rounded-2xl shadow-sm bg-[#ced8aa]">
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
                            <Card className="rounded-2xl shadow-sm bg-[#ced8aa]">
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
                            <Card className="rounded-2xl shadow-sm bg-[#ced8aa]">
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
                    <Card className="rounded-3xl shadow-sm bg-[#ced8aa]">
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
                                        <Badge className="rounded-full">
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
            <section className="mx-auto max-w-6xl px-4 py-10 text-black">
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
                        <Card key={s.title} className="rounded-3xl shadow-sm bg-[#ced8aa]">
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

            <BottomBar />
        </div>
    )
}