"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Props {
    search: string
    setSearch: (v: string) => void
    country: string | null
    setCountry: (v: string | null) => void
    industry: string | null
    setIndustry: (v: string | null) => void
    countries: string[]
    industries: string[]
}

export default function CompanyFilterSidebar({
                                                 search,
                                                 setSearch,
                                                 country,
                                                 setCountry,
                                                 industry,
                                                 setIndustry,
                                                 countries,
                                                 industries,
                                             }: Props) {
    return (
            <Card className="rounded-2xl shadow-lg backdrop-blur self-start">
                <CardContent className="p-5 space-y-6">
                    <h3 className="text-lg font-semibold">Filter</h3>

                    {/* Search */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Search company
                        </label>
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="e.g. Tesla"
                            className="placeholder:text-grey-700"
                        />
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Country</label>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant={country === null ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setCountry(null)}
                            >
                                All
                            </Badge>
                            {countries.map((c) => (
                                <Badge
                                    key={c}
                                    variant={country === c ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setCountry(country === c ? null : c)
                                    }
                                >
                                    {c}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Industry</label>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant={
                                    industry === null ? "default" : "outline"
                                }
                                className="cursor-pointer"
                                onClick={() => setIndustry(null)}
                            >
                                All
                            </Badge>
                            {industries.map((i) => (
                                <Badge
                                    key={i}
                                    variant={
                                        industry === i ? "default" : "outline"
                                    }
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setIndustry(industry === i ? null : i)
                                    }
                                >
                                    {i}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
    )
}
