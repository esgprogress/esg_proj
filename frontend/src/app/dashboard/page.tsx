"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";

export interface CompanySummary {
    name: string
    slug: string
    industry: string
    country: string
}

function shuffle<T>(array: T[]): T[] {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

export default function DashboardPage() {
    const [companies, setCompanies] = useState<CompanySummary[]>([])
    const [shuffled, setShuffled] = useState<CompanySummary[]>([])

    useEffect(() => {
        async function load() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`)
            const json = await res.json()

            const data = Array.isArray(json) ? json : json.data

            setCompanies(data)
            setShuffled(shuffle(data))
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
        <div className="min-h-screen bg-background">

            <TopBar/>

            <div className="mx-auto max-w-6xl px-4 py-14">
                <div className="flex flex-col justify-center space-y-4">
                    <header className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">ESG Dashboard</h1>
                        <p className="text-muted-foreground">
                            Browse companies by industry and explore detailed ESG performance
                        </p>
                    </header>

                    {Object.entries(grouped).map(([industry, items]) => (
                        <section key={industry} className="space-y-3">
                            <h2 className="text-xl font-semibold">{industry}</h2>

                            <div className="relative">
                                <div
                                    className="
                flex gap-4 overflow-x-auto pb-4
                snap-x snap-mandatory
                scrollbar-thin scrollbar-thumb-muted
            "
                                >
                                    <AnimatePresence>
                                        {items.map((company, index) => (
                                            <motion.div
                                                key={company.slug}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3, delay: index * 0.04 }}
                                                className="snap-start shrink-0"
                                            >
                                                <Link href={`/company/${company.slug}`}>
                                                    <Card className="w-64 cursor-pointer rounded-2xl shadow-lg backdrop-blur hover:shadow-xl transition">
                                                        <CardContent className="space-y-2 p-3">
                                                            <div>
                                                                <h3 className="text-lg font-semibold">
                                                                    {company.name}
                                                                </h3>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {company.industry}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <Badge variant="secondary">
                                                                    {company.country}
                                                                </Badge>
                                                                <span className="text-xs text-muted-foreground">
                                            View →
                                        </span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
            <BottomBar/>
        </div>
    )
}
