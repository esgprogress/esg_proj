"use client"

import {useMemo, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {EScoreTable} from "./EScoreTable"
import {EnvironmentQualitativeData} from "@/lib/types"
import {normalizeEnvironmentalQualitativeMetric} from "@/lib/esg/normalizeEnvironmental";

export function EnvironmentalQualitativeSection({
                                                    rows,
                                                }: {
    rows: any[]
}) {

    const normalized_data = rows.flatMap((row) => {
        return normalizeEnvironmentalQualitativeMetric(row.criterion, row)
    })

    const years = useMemo(
        () =>
            Array.from(new Set(normalized_data.map(r => r.year))).sort((a, b) => b - a),
        [normalized_data]
    )

    const [selectedYear, setSelectedYear] = useState(years[0])

    const filteredRows = normalized_data.filter(r => r.year === selectedYear)

    return (
        <section className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
            <header className="space-y-1">
                <h2 className="text-lg font-semibold">Environmental (Qualitative)</h2>
                <p className="text-sm text-muted-foreground">
                    Policies, disclosures, and narrative commitments
                </p>
            </header>

            {/* Year selector */}
            <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`rounded-lg px-4 py-1.5 text-sm transition
      ${
                            selectedYear === year
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground hover:bg-muted/70"
                        }`}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Cross-fade table */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedYear}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                >
                    <EScoreTable rows={filteredRows}/>
                </motion.div>
            </AnimatePresence>
        </section>
    )
}
