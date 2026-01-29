"use client"

import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {ArrowRight, CheckCircle2, LineChart, Lock, Rocket, Sparkles,} from "lucide-react";
// shadcn/ui
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import Link from "next/link";
import {CompanyAvatar} from "@/components/CompanyAvatar";

function Stat({label, value, sub}: { label: string; value: string; sub?: string }) {
    return (
        <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-5">
                <div className="text-sm text-muted-foreground text-[#b5c577]">{label}</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight text-[#b5c577]">{value}</div>
                {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
            </CardContent>
        </Card>
    );
}

function Pill({children}: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
    );
}

export default function RootLayout() {
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`
            );
            const data = await res.json();
            setFiltered(data);
            setLoading(false);
        }

        load();
    }, []);

    return (
        <div className="min-h-screen bg-[#313d00]">
            {/* Top bar */}
            <TopBar/>

            {/* Hero */}
            <section className="relative overflow-hidden text-white">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div
                        className="absolute -top-24 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-muted to-transparent blur-3xl"/>
                    <div
                        className="absolute -bottom-24 left-1/3 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-muted to-transparent blur-3xl"/>
                </div>

                <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5}}
                            className="flex flex-wrap items-center gap-2"
                        >
                            <Badge variant="secondary" className="rounded-full">
                                <Sparkles className="mr-1 h-3.5 w-3.5"/> Open-source
                            </Badge>
                            <Pill>Public-domain only</Pill>
                            <Pill>Transparent methodology</Pill>
                            <Pill>Built for everyone</Pill>
                        </motion.div>

                        <motion.h1
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.55, delay: 0.05}}
                            className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl text-[#b5c577]"
                        >
                            The go-to place to understand what top global companies are doing in ESG — commitments and
                            real action.
                        </motion.h1>

                        <motion.p
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.55, delay: 0.1}}
                            className="mt-4 text-base text-muted-foreground md:text-lg"
                        >
                            We ingest ESG signals from public sources, normalize them, and publish easy dashboards and
                            plain-language
                            summaries. No paywalls. No jargon. Just verifiable data and clear context.
                        </motion.p>

                        <div className="mt-6 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4"/> Source-cited
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4"/> Privacy-respecting
                            </div>
                            <div className="flex items-center gap-2">
                                <LineChart className="h-4 w-4"/> Trend-aware
                            </div>
                            <div className="flex items-center gap-2">
                                <Rocket className="h-4 w-4"/> Community-built
                            </div>
                        </div>
                    </div>

                    {/* Hero right: preview */}
                    <motion.div
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.08}}
                        className="relative"
                    >
                        <Card className="rounded-3xl shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Live search</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 pt-2">

                                <div className="mt-4 grid gap-3">
                                    {filtered.slice(0, 5).map((c) => (
                                        <Link href={`/company/${c.slug}`} key={c.slug}>
                                            <div
                                                className="flex items-center gap-3 rounded-2xl border p-3 bg-[#8d9765]"
                                            >
                                                <CompanyAvatar slug={c.slug} name={c.name} size={35}/>

                                                <div className="flex flex-col">
                                                    <div className="text-sm font-medium">{c.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {c.industry} • {c.country}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <Separator className="my-5"/>

                                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                                    <Link href="/our-methodology">
                                        <Button
                                            variant="outline"
                                            className="rounded-2xl bg-[#8d9765]"
                                        >
                                            Read methodology <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="mx-auto max-w-6xl px-4 pb-10 text-white">
                <div className="grid gap-4 md:grid-cols-4">
                    <Stat label="Coverage" value="Top global corporates"
                          sub="Starting with largest market caps; expanding via community"/>
                    <Stat label="Sources" value="Public-domain"
                          sub="Reports, filings, initiatives, registries, announcements"/>
                    <Stat label="Outputs" value="Dashboards + summaries"
                          sub="Readable by anyone, but traceable to evidence"/>
                    <Stat label="License" value="Open-source" sub="Code + schemas + scoring methods in public"/>
                </div>
            </section>


            <BottomBar className="text-white"/>
        </div>
    );
}
