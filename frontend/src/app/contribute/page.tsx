"use client"

import BottomBar from "@/components/BottomBar";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TopBar from "@/components/TopBar";
import { ContributeForm } from "@/components/ContributeForm";
import { motion } from "framer-motion";
import {heroFadeUp} from "@/lib/utils";

export default function ContributePage() {
    return (
        <div className="min-h-screen bg-[#f3f6ef] text-black">
            <TopBar />

            <section className="mx-auto max-w-6xl px-4 py-14 text-slate-600">
                {/* Page title */}
                <motion.div {...heroFadeUp(0)}>
                    <h1 className="text-5xl font-semibold text-black mb-8">
                        Contribute
                    </h1>
                </motion.div>

                <motion.div {...heroFadeUp(0.08)}>
                    <Card className="rounded-3xl bg-[#eef2e6] border-[#c6d1b3] shadow-sm">
                        <CardContent className="p-7 md:p-10">
                            <div className="grid items-center gap-6 md:grid-cols-2">
                                {/* Left content */}
                                <motion.div {...heroFadeUp(0.12)}>
                                    <div className="text-sm font-semibold text-black">
                                        Join the mission
                                    </div>
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-black">
                                        Make ESG information understandable,
                                        verifiable, and open.
                                    </h3>
                                    <p className="mt-3 text-slate-600">
                                        Whether you’re a developer, researcher,
                                        journalist, student, or simply curious —
                                        help us expand coverage, improve methods,
                                        and keep the data honest.
                                    </p>
                                </motion.div>

                                {/* Audience cards */}
                                <div className="grid gap-3 md:grid-cols-2">
                                    {[
                                        {
                                            title: "For everyone",
                                            desc: "Plain-language summaries and explainers",
                                        },
                                        {
                                            title: "For analysts",
                                            desc: "Open datasets, filters, exports",
                                        },
                                        {
                                            title: "For builders",
                                            desc: "APIs, schemas, reproducible pipelines",
                                        },
                                        {
                                            title: "For watchdogs",
                                            desc: "Evidence links, versioning, transparency",
                                        },
                                    ].map((x, i) => (
                                        <motion.div
                                            key={x.title}
                                            {...heroFadeUp(0.16 + i * 0.06)}
                                            className="rounded-2xl border border-[#c6d1b3] p-4 bg-[#f7f9f2]"
                                        >
                                            <div className="text-sm font-semibold text-black">
                                                {x.title}
                                            </div>
                                            <div className="mt-1 text-sm text-slate-600">
                                                {x.desc}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact */}
                            <motion.div {...heroFadeUp(0.42)}>
                                <h4 className="text-xl font-semibold text-black mt-8">
                                    Contact Us
                                </h4>
                            </motion.div>

                            <motion.div {...heroFadeUp(0.48)}>
                                <ContributeForm />
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>

            <BottomBar />
        </div>
    );
}
