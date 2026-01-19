"use client"

import React, { useEffect, useState } from "react"
import {motion, Variants} from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TopBar from "@/components/TopBar"
import BottomBar from "@/components/BottomBar"
import {sort} from "d3";

export interface CompanySummary {
    name: string
    slug: string
    industry: string
    country: string
}

const heroFadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
}

export default function DashboardPage() {
    const [shuffled, setShuffled] = useState<CompanySummary[]>([])

    useEffect(() => {
        async function load() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`
            )
            const json = await res.json()
            const data = Array.isArray(json) ? json : json.data
            setShuffled(sort(data))
        }
        load()
    }, [])

    const grouped = shuffled.reduce<Record<string, CompanySummary[]>>(
        (acc, c) => {
            acc[c.industry] ??= []
            acc[c.industry].push(c)
            return acc
        },
        {}
    )

    return (
        <div className="min-h-screen bg-[#f3f6ef] text-black">
            <TopBar />

            <main className="mx-auto max-w-6xl px-4 py-20 space-y-20">
                {/* Page header */}
                <header className="max-w-3xl space-y-4">
                    <motion.h1
                        variants={heroFadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl font-semibold tracking-tight"
                    >
                        ESG Dashboard
                    </motion.h1>

                    <motion.p
                        variants={heroFadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.08 }}
                        className="text-base text-black/70"
                    >
                        Browse companies by industry and explore detailed ESG
                        performance
                    </motion.p>
                </header>

                {/* Industry sections */}
                <div className="space-y-20">
                    {Object.entries(grouped).map(([industry, items]) => (
                        <motion.section
                            key={industry}
                            variants={heroFadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h2 className="text-xl font-semibold tracking-tight">
                                {industry}
                            </h2>

                            <div
                                className="
                                    flex gap-4 overflow-x-auto pb-4
                                    snap-x snap-mandatory
                                    scrollbar-thin scrollbar-thumb-black/20
                                "
                            >
                                {items.map((company) => (
                                    <motion.div
                                        key={company.slug}
                                        variants={heroFadeUp}
                                        className="snap-start shrink-0"
                                    >
                                        <Link
                                            href={`/company/${company.slug}`}
                                            className="block"
                                        >
                                            <Card className="w-64 rounded-2xl border-black/10 bg-[#eef2e6] shadow-sm hover:shadow-md transition">
                                                <CardContent className="p-4 space-y-3">
                                                    <div>
                                                        <h3 className="text-lg font-medium">
                                                            {company.name}
                                                        </h3>
                                                        <p className="text-sm text-black/60">
                                                            {company.industry}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <Badge className="bg-black/10 text-black">
                                                            {company.country}
                                                        </Badge>
                                                        <span className="text-xs text-black/60">
                                                            View →
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </main>

            <BottomBar />
        </div>
    )
}
