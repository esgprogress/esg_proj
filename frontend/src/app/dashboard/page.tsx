"use client"

import React, {useEffect, useMemo, useState} from "react"
import {motion} from "framer-motion"
import Link from "next/link"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import TopBar from "@/components/TopBar"
import BottomBar from "@/components/BottomBar"
import CompanyFilterSidebar from "@/app/dashboard/components/CompanyFilterSearchSidebar";
import {ArrowRight} from "lucide-react";
import {heroFadeUpVariants} from "@/lib/utils";

export interface CompanySummary {
    name: string
    slug: string
    industry: string
    country: string
}

export default function DashboardPage() {
    const [companies, setCompanies] = useState<CompanySummary[]>([])
    const [search, setSearch] = useState("")
    const [country, setCountry] = useState<string | null>(null)
    const [industry, setIndustry] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/companies`
            )
            const json = await res.json()
            const data = Array.isArray(json) ? json : json.data
            setCompanies(data)
        }

        load()
    }, [])

    const countries = useMemo(
        () => Array.from(new Set(companies.map((c) => c.country))),
        [companies]
    )

    const industries = useMemo(
        () => Array.from(new Set(companies.map((c) => c.industry))),
        [companies]
    )

    const filtered = useMemo(() => {
        return companies.filter((c) => {
            if (
                search &&
                !c.name.toLowerCase().includes(search.toLowerCase())
            )
                return false
            if (country && c.country !== country) return false
            return !(industry && c.industry !== industry);

        })
    }, [companies, search, country, industry])

    return (
        <div className="min-h-screen bg-[#f3f6ef] text-black">
            <TopBar/>

            <main className="mx-auto max-w-6xl px-4 py-20 space-y-20">

                {/* Page header */}
                <header className="max-w-3xl space-y-4">
                    <motion.h1
                        variants={heroFadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl font-semibold tracking-tight"
                    >
                        ESG Dashboard
                    </motion.h1>

                    <motion.p
                        variants={heroFadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{delay: 0.08}}
                        className="text-base text-black/70"
                    >
                        Browse companies by industry and explore detailed ESG
                        performance
                    </motion.p>
                </header>

                <div className="grid grid-cols-[280px_1fr] gap-6">

                    <motion.section
                        variants={heroFadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="space-y-4">
                        <CompanyFilterSidebar
                            search={search}
                            setSearch={setSearch}
                            country={country}
                            setCountry={setCountry}
                            industry={industry}
                            setIndustry={setIndustry}
                            countries={countries}
                            industries={industries}
                        />
                    </motion.section>


                    {/* Industry sections */}
                    <div className="space-y-20">
                        <motion.section
                            variants={heroFadeUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            className="space-y-4"
                        >
                            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                                {filtered.map((company) => (
                                    <motion.div
                                        key={company.slug}
                                        variants={heroFadeUpVariants}
                                        className="snap-start shrink-0"
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <Link href={`/company/${company.slug}`} className="block">
                                            <Card
                                                className="h-full rounded-2xl border-black/10 bg-[#eef2e6] shadow-sm hover:shadow-md transition">
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
                                        View <ArrowRight className="fill-grey-800"/>
                                    </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </div>
            </main>
            <BottomBar/>
        </div>
    )
}
